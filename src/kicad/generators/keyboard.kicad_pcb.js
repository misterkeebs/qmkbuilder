const Generator = require('../../files/generators/index');
const Nets = require('./templates/keyboard.kicad_pcb/nets');
const Switch = require('./templates/keyboard.kicad_pcb/switch');
const Diode = require('./templates/keyboard.kicad_pcb/diode');
const Frame = require('./templates/keyboard.kicad_pcb/frame');
const Plane = require('./templates/keyboard.kicad_pcb/plane');

const formatName = require('./name');

class PCBGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.kicad_pcb'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const nets = new Nets();
		const nameSet = new Set();
    const modules = [];
    const gap = 4;

    [...Array(keyboard.cols+1)].forEach((_, i) => nets.add(`/col${i}`));
    [...Array(keyboard.rows+1)].forEach((_, i) => nets.add(`/row${i}`));

    for (let row = 0; row < keyboard.rows; row ++) {
			for (let col = 0; col < keyboard.cols; col ++) {
				const keys = keyboard.wiring[row + ',' + col];
				if (keys) {
					keys.forEach(k => {
						let name = formatName(k.legend);
            while (nameSet.has(name)) {
              const num = name.replace(/^\D+/g, '');
              const prefix = name.replace(/\d+$/g, '');
              const i = num ? parseInt(num, 10) + 1 : 1;
              name = `${prefix}${i}`;
            }
            nameSet.add(name);
            k.name = name;
            const theSwitch = new Switch(k, nets, this.leds);
            const diode     = new Diode(k, nets);
            theSwitch.connectPads(2, diode, 2);
            modules.push(theSwitch.render(k.pos.x, k.pos.y, k.rotation));
            modules.push(diode.render(k.pos.x - 0.5, k.pos.y, 90));
          });
        }
      }
    }

    modules.push(new Frame(keyboard).render(gap));
    modules.push(new Plane(keyboard, 'GND', 'F.Cu').render(gap + 1));
    modules.push(new Plane(keyboard, 'VCC', 'B.Cu').render(gap + 1));

		return {
      'nets':        nets.array.map(n => `  ${nets.format(n)}`).join('\n'),
      'net_classes': nets.array.map(n => `  (add_net "${n}")`).join('\n'),
      'modules':     modules.join(''),
    };
	}

}

module.exports = PCBGenerator;
