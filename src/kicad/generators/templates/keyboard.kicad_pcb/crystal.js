const Component = require('./component');

class Crystal extends Component {
  constructor(nets) {
    super('crystal', null, 4, nets, 'X');
    this.template = require('./crystal.ejs');
  }
}

module.exports = Crystal;
