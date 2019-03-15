const Component = require('./component');

class Usb extends Component {
  constructor(nets) {
    super('usb', null, 6, nets, 'USB');
    this.template = require('./usb.ejs');
  }
}

module.exports = Usb;
