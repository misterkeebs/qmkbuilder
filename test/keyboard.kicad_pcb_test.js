const { expect } = require('chai');

const PCBGenerator = require('../src/kicad/generators/keyboard.kicad_pcb');
const Keyboard = require('../src/state/keyboard');

describe('PCBGenerator', () => {
  it('does something', () => {
    const state = { update: () => {} };
    const json = require('./fixtures/tmo50');

    const kb = Keyboard.deserialize(state, json.keyboard);
    const gen = new PCBGenerator(kb);
    const res = gen.generate();
    require('fs').writeFileSync('output/new.kicad_pcb', res);
  });
});
