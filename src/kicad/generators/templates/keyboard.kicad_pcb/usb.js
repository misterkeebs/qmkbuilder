const Component = require('./component');

class Usb extends Component {
  constructor(nets) {
    super('usb', null, 6, nets, 'USB');
  }
}

module.exports = Usb;
