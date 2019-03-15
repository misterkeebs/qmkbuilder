const Rectangular = require('./rectangular');

class Plane extends Rectangular {
  constructor(kb, name, layer, gap=2) {
    super(kb, 'plane', name, gap);
    this.template = require('./plane.ejs');
    this.layer = layer;
  }

  getAdditionalData() {
    return Object.assign(super.getAdditionalData(), { layer: this.layer });
  }
}

module.exports = Plane;
