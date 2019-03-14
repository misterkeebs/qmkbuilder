const Generator = require('../../files/generators/index');

class SymLibTableGenerator extends Generator {

	loadTemplate() { return require('./templates/sym-lib-table'); }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

module.exports = SymLibTableGenerator;
