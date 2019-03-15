const Component = require('./component');

class Cap extends Component {
  constructor(nets) {
    super('cap', null, 2, nets);
    this.template = require('./cap.ejs');
  }
}

module.exports = Cap;
