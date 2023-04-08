const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.get('/log', (req, res, next) => {
  return res.render('index.ejs');
});

router.post('/log', async (req, res, next) => {
  try {
    const { email, password, passwordConf, Name } = req.body;

    if (!email || !password || !passwordConf) {
      return res.send();
    }

    if (password !== passwordConf) {
      return res.send('Password is not matched');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send('Email is already used');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      Name,
    });

    await newUser.save();
    return res.status(200).json({ message: 'user registered successfully' });
  } catch (error) {
	console.error(error);
	return res.status(500).send(error.message);
  }
});

router.get('/login', (req, res, next) => {
  return res.render('login.ejs');
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send('This Email Is not registered');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.userId = user.unique_id;
      return res.status(200).json({ message: 'user login successfully' });
    } else {
      return res.send('Wrong password!');
    }
  } catch (error) {
	console.error(error);
	return res.status(500).send(error.message);
  }
});

router.get('/profileuser', async (req, res, next) => {
  try {
    const user = await User.findOne({ unique_id: req.session.userId });

    if (!user) {
      return res.redirect('/');
    }

    return res.render('data.ejs', { Name: user.Name, email: user.email });
  } catch (error) {
	console.error(error);
	return res.status(500).send(error.message);
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  }
});

router.get('/user', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.render('userget.ejs', { users });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});


router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', async function (req, res, next) {
	try {
		const data = await User.findOne({ email: req.body.email });
		console.log(data);
		if (!data) {
			res.send("This Email Is not regestered!");
		} else {
			if (req.body.password == req.body.passwordConf) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(req.body.password, salt);
				data.password = hashedPassword;
				data.passwordConf = req.body.passwordConf;

				await data.save();
				console.log('Success');
				res.send("Password changed!");
			} else {
				res.send("Password does not match!");
			}
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;