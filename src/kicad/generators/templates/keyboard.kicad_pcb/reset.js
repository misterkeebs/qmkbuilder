const Component = require('./component');

class Reset extends Component {
  constructor(nets) {
    super('reset', null, 2, nets);
  }
}

module.exports = Reset;
