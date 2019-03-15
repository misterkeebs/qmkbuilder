const Component = require('./component');

class Reset extends Component {
  constructor(nets) {
    super('reset', null, 2, nets);
    this.template = require('./reset.ejs');
  }
}

module.exports = Reset;
