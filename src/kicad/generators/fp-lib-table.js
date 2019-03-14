const Generator = require('../../files/generators/index');

class FpLibTableGenerator extends Generator {

	loadTemplate() { return require('./templates/fp-lib-table'); }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

module.exports = FpLibTableGenerator;
