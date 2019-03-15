class Nets {
  constructor() {
    this.clear();
  }

  get array() {
    return [...this.nets];
  }

  clear() {
    this.nets = new Set();
    this.add('');
    this.add('GND');
    this.add('VCC');
  }

  format(net) {
    return `(net ${this.indexOf(net)} "${net}")`;
  }

  get(name) {
    const net = this.array[this.indexOf(name)];
    if (!net) {
      throw `Net with name ${name} not found`
    }
    return this.format(net);
  }

  indexOf(net) {
    return this.array.indexOf(net);
  }

  add(net) {
    this.nets.add(net);
    return this.format(net);
  }
}

module.exports = Nets;
