const Component = require('./component');

class Text extends Component {
  constructor(text, size_x, size_y) {
    super('text');
    this.template = require('./text.ejs');
    this.text = text;
    this.size_x = size_x;
    this.size_y = size_y;
  }

  getAdditionalData(x, y, options) {
    return {
      text: this.text,
      size_x: this.size_x,
      size_y: this.size_y,
    };
  }
}

module.exports = Text;
