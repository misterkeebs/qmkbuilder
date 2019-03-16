const ejs = require('ejs');
const Generator = require('../../files/generators/index');
const formatName = require('./name');
const genTstamp = require('./tstamp');
const pinPadMap = require('./pin-pad-map');

class SchematicsGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.sch'); }

  renderMatrix(components) {
		const switchTpl = require('./templates/keyboard.sch/switch');
    const rowLabelTpl = require('./templates/keyboard.sch/row-label');
    const colLabelTpl = require('./templates/keyboard.sch/col-label');
    const wiringTpl = require('./templates/keyboard.sch/wiring');

		const keyboard = this.keyboard;
    const lastColY = [...Array(keyboard.cols)].fill(0);
    const nameSet = new Set();

		for (let row = 0; row < keyboard.rows; row ++) {
      // row label
      const lx = 1500;
      const ly = 1000 + (row * 1000);
      const data = { row, x: lx, y: ly };
      components.push(ejs.render(rowLabelTpl, { data }));

      // keeps track of the last switch on this row
      let lastX = 0;

			for (let col = 0; col < keyboard.cols; col ++) {
        // column label
        if (row === 0) {
          const cx = 1500 + (col * 1000);
          const cy = 1000;
          const data = { col, x: cx, y: cy };
          components.push(ejs.render(colLabelTpl, { data }));
        }

        // iterate through all the keys on this particular row/col
				const keys = keyboard.wiring[row + ',' + col];
        const x = 1500 + (col * 1000);
        const y = 1000 + (row * 1000);
				if (keys) {
					keys.forEach(key => {
            // makes sure the key name is unique
						let name = formatName(key.legend);
            while (nameSet.has(name)) {
              const num = name.replace(/^\D+/g, '');
              const prefix = name.replace(/\d+$/g, '');
              const i = num ? parseInt(num, 10) + 1 : 1;
              name = `${prefix}${i}`;
            }
            nameSet.add(name);

            // renders the switch
						const id = `${key.id.toString(16)}`;
						const data = { key, name, id, x, y };
						const theSwitch = ejs.render(switchTpl, { data, keyboard });
						components.push(theSwitch);
					});
          lastX = x;

          // keeps track of the last switch position on this column
          lastColY[col] = Math.max(lastColY[col], ly + 350);
				}
			}

      // render the wiring from the diode to the row
      components.push(ejs.render(wiringTpl, { x0: lx - 350, y0: ly + 400, x1: lastX - 350, y1: ly + 400 }));
		}

    // render the wiring from the switch pad to the column
    for (let col = 0; col < keyboard.cols; col ++) {
      const cx = 1500 + (col * 1000) + 300;
      const cy = lastColY[col];
      const data = { col, x: cx, y: cy };
      components.push(ejs.render(wiringTpl, { x0: cx, y0: cy - 350, x1: cx, y1: 1000 }));
    }
  }

  getPadCoord(pad) {
    const x = pad < 23 ? 7500 : 9650;
    const y = pad < 23 ? 6950 + ((pad-1) * 100) : 9050 - ((pad-23) * 100);
    return { x, y };
  }

  addPadLabel(pad, text) {
		const glabelTpl = require('./templates/keyboard.sch/glabel');
    const { x, y } = this.getPadCoord(pad);
    const rotation = pad < 23 ? 0 : 2;
    const data = { text, x, y, rotation };
    return ejs.render(glabelTpl, { data });
  }

  addNoConnect(pad) {
    const { x, y } = this.getPadCoord(pad);
    return `NoConn ~ ${x} ${y}\n`;
  }

	fillTemplate() {
    const components = [];

		const microTpl = require('./templates/keyboard.sch/micro');

    const tstamp = genTstamp('micro', 1);
    const data = { x: 8550, y: 8000, tstamp, name: 'U1' };
    components.push(ejs.render(microTpl, { data }));

    [...Array(this.keyboard.rows)].forEach((_, r) => {
      const pad = pinPadMap[this.keyboard.pins.row[r]];
      components.push(this.addPadLabel(pad, `row${r}`))
    });

    [...Array(this.keyboard.cols)].forEach((_, c) => {
      const pad = pinPadMap[this.keyboard.pins.col[c]];
      components.push(this.addPadLabel(pad, `col${c}`))
    });

    components.push(this.addNoConnect(1));
    components.push(this.addNoConnect(7));

    this.renderMatrix(components);

		return {
			'components': components.join(''),
		};
	}

}

module.exports = SchematicsGenerator;
