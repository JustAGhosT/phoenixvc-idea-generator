// This file mocks CSS modules
// It returns a proxy that returns the property name as the class name
module.exports = new Proxy(
  {},
  {
    get: function(target, prop) {
      // Return the property name for any requested CSS class
      if (prop === '__esModule') {
        return false;
      }
      return prop;
    }
  }
);