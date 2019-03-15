const Component = require('./component');

class Cap extends Component {
  constructor(nets) {
    super('cap', null, 2, nets);
  }
}

module.exports = Cap;
