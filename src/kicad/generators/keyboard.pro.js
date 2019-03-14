const Generator = require('../../files/generators/index');

class ProjectGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.pro'); }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

module.exports = ProjectGenerator;
