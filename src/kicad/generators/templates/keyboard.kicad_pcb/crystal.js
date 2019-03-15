const Component = require('./component');

class Crystal extends Component {
  constructor(nets) {
    super('crystal', null, 4, nets, 'X');
  }
}

module.exports = Crystal;
