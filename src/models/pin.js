
class Pin {
    constructor(pin) {
      this.pin = pin;
    
    }
    
  
    static generate() {
      return new Pin(Math.floor(Math.random() * 9000) + 1000);
    
    }
    
  }
  
  
  module.exports = Pin;
  