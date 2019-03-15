const ejs = require('ejs');
const Generator = require('../../files/generators/index');
const formatName = require('./name');
const randomHex = require('./templates/randomhex');

class SchematicsGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.sch'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const components = [];

		const switchTpl = require('./templates/keyboard.sch/switch');
    const rowLabelTpl = require('./templates/keyboard.sch/row-label');
    const rowWiringTpl = require('./templates/keyboard.sch/row-wiring');
		const prefix = randomHex(2);

		const result = [];
		for (let row = 0; row < keyboard.rows; row ++) {
      const lx = 1500;
      const ly = 1000 + (row * 1000);
      const data = { row, x: lx, y: ly };
      result.push(ejs.render(rowLabelTpl, { data }));
      let lastX = 0;
			for (let col = 0; col < keyboard.cols; col ++) {
				const keys = keyboard.wiring[row + ',' + col];
        const x = 1500 + (col * 1000);
        const y = 1000 + (row * 1000);
				if (keys) {
					keys.forEach(key => {
						const name = formatName(key.legend);
						const id = `${prefix}${randomHex(5)}`;
						const data = { key, name, id, x, y };
						const theSwitch = ejs.render(switchTpl, { data, keyboard });
						result.push(theSwitch);
					});
          lastX = x;
				}
			}
      result.push(ejs.render(rowWiringTpl, { x0: lx - 350, y0: ly + 400, x1: lastX - 350, y1: ly + 400 }));
		}

		return {
			'components': result.join(''),
		};
	}

}

module.exports = SchematicsGenerator;
