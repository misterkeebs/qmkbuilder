const Component = require('./component');

class Diode extends Component {
  constructor(key, nets) {
    super('diode', `D_${key.name}`, 2, nets);
    this.setPad(1, `/col${key.col}`);
    this.template = require('./diode.ejs');
    this.key = key;
  }

  getAdditionalData(x, y, options) {
    return {
      key: this.key,
      x: ((x + 0.5) * 1905) / 100,
      y: ((y + 0.5) * 1905) / 100,
    };
  }
}

module.exports = Diode;
