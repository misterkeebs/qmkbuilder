const ejs = require('ejs');
const Generator = require('../../files/generators/index');
const formatName = require('./name');
const randomHex = require('./templates/randomhex');

class SchematicsGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.sch'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const components = [];

		const template = require('./templates/keyboard.sch/switch');
		const prefix = randomHex(2);

		const result = [];
		for (let row = 0; row < keyboard.rows; row ++) {
			for (let col = 0; col < keyboard.cols; col ++) {
				const keys = keyboard.wiring[row + ',' + col];
				if (keys) {
					keys.forEach(key => {
						const name = formatName(key.legend);
						const id = `${prefix}${randomHex(5)}`;
						const data = { key, name, id };
						const theSwitch = ejs.render(template, { data });
						result.push(theSwitch);
					});
				}
			}
		}

		return {
			'components': result.join(''),
		};
	}

}

module.exports = SchematicsGenerator;
