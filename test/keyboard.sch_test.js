const { expect } = require('chai');

const SchematicsGenerator = require('../src/kicad/generators/keyboard.sch');
const Keyboard = require('../src/state/keyboard');

describe('SchematicsGenerator', () => {
  it('does something', () => {
    const state = { update: () => {} };
    const json = require('./fixtures/no_first');

    const kb = Keyboard.deserialize(state, json.keyboard);
    console.log('kb.pins', kb.pins);
    const gen = new SchematicsGenerator(kb);
    const res = gen.generate();
    require('fs').writeFileSync('output/new.sch', res);
  });
});
