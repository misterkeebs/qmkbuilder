const Element = require('./element');

class Connection extends Element {
  constructor() {
    super('connection');
    this.template = require('./connection.ejs');
  }
}

module.exports = Connection;
