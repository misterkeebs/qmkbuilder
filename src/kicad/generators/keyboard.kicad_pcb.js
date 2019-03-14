const Generator = require('../../files/generators/index');

class PCBGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.kicad_pcb'); }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

module.exports = PCBGenerator;
