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
    const colLabelTpl = require('./templates/keyboard.sch/col-label');
    const wiringTpl = require('./templates/keyboard.sch/wiring');
		const prefix = randomHex(2);

		const result = [];
    const lastColY = [...Array(keyboard.cols)].fill(0);
		for (let row = 0; row < keyboard.rows; row ++) {
      const lx = 1500;
      const ly = 1000 + (row * 1000);
      const data = { row, x: lx, y: ly };
      result.push(ejs.render(rowLabelTpl, { data }));
      let lastX = 0;
			for (let col = 0; col < keyboard.cols; col ++) {
        if (row === 0) {
          const cx = 1500 + (col * 1000);
          const cy = 1000;
          const data = { col, x: cx, y: cy };
          result.push(ejs.render(colLabelTpl, { data }));
        }
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
          lastColY[col] = Math.max(lastColY[col], ly + 350);
				}
			}
      result.push(ejs.render(wiringTpl, { x0: lx - 350, y0: ly + 400, x1: lastX - 350, y1: ly + 400 }));
		}

    for (let col = 0; col < keyboard.cols; col ++) {
      const cx = 1500 + (col * 1000) + 300;
      const cy = lastColY[col];
      const data = { col, x: cx, y: cy };
      result.push(ejs.render(wiringTpl, { x0: cx, y0: cy - 350, x1: cx, y1: 1000 }));
    }

		return {
			'components': result.join(''),
		};
	}

}

module.exports = SchematicsGenerator;
