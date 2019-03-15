const Component = require('./component');

class Resistor extends Component {
  constructor(resistence, nets) {
    super('resistor', null, 2, nets);
    this.res = resistence;
  }

  getAdditionalData() {
    return { res: this.res };
  }
}

module.exports = Resistor;
