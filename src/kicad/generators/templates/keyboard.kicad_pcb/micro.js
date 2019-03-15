const Component = require('./component');

class Micro extends Component {
  constructor(nets) {
    super('micro', null, 44, nets, 'U');
    this.template = require('./micro.ejs');
  }
}

module.exports = Micro;
