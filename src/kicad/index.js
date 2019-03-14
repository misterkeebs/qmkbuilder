const PCBGenerator = require('./generators/keyboard.kicad_pcb');
const SchematicsGenerator = require('./generators/keyboard.sch');
const ProjectGenerator = require('./generators/keyboard.pro');
const FpLibTableGenerator = require('./generators/fp-lib-table');
const SymLibTableGenerator = require('./generators/sym-lib-table');

class KiCad {

	/*
	 * Generate the set of kicad files given a Keyboard.
	 *
	 * @param {Keyboard} keyboard The keyboard to generate files from.
	 *
	 * @return {Object} The generated source files.
	 */
	static generate(keyboard) {
		return {
      'keyboard.kicad_pcb': new PCBGenerator(keyboard).generate(),
      'keyboard.sch': new SchematicsGenerator(keyboard).generate(),
      'keyboard.pro': new ProjectGenerator(keyboard).generate(),
      'fp-lib-table': new FpLibTableGenerator(keyboard).generate(),
      'sym-lib-table': new SymLibTableGenerator(keyboard).generate(),
		};
	}

}

module.exports = KiCad;
