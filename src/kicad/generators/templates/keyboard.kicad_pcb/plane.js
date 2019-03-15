const Rectangular = require('./rectangular');

class Plane extends Rectangular {
  constructor(kb, name, layer, gap=2) {
    super(kb, 'plane', name, gap);
    this.layer = layer;
  }

  getAdditionalData() {
    console.log('x', Object.assign(super.getAdditionalData(), { layer: this.layer }));
    return Object.assign(super.getAdditionalData(), { layer: this.layer });
  }
}

module.exports = Plane;
