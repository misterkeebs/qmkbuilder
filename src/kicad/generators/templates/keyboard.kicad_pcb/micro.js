const Component = require('./component');

class Micro extends Component {
  constructor(nets) {
    super('micro', null, 44, nets, 'U');
  }
}

module.exports = Micro;
