const Generator = require('../../files/generators/index');

class SchematicsGenerator extends Generator {

	loadTemplate() { return require('./templates/sym-lib-table'); }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

module.exports = SchematicsGenerator;
