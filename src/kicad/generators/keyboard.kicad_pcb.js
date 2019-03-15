const Generator = require('../../files/generators/index');
const Nets = require('./templates/keyboard.kicad_pcb/nets');
const Switch = require('./templates/keyboard.kicad_pcb/switch');
const Diode = require('./templates/keyboard.kicad_pcb/diode');

class PCBGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.kicad_pcb'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const nets = new Nets();
    const modules = [];

    [...Array(keyboard.cols+1)].forEach((_, i) => nets.add(`/col${i}`));
    [...Array(keyboard.rows+1)].forEach((_, i) => nets.add(`/row${i}`));

    for (let row = 0; row < keyboard.rows; row ++) {
			for (let col = 0; col < keyboard.cols; col ++) {
				const keys = keyboard.wiring[row + ',' + col];
				if (keys) {
					keys.forEach(k => {
            const theSwitch = new Switch(k, nets, this.leds);
            const diode     = new Diode(k, nets);
            theSwitch.connectPads(2, diode, 2);
            modules.push(theSwitch.render(k.x, k.y, k.rotation));
            modules.push(diode.render(k.x - 0.5, k.y, 90));
          });
        }
      }
    }

    console.log('nets.array', nets.array);
    const netTpl = require('./templates/keyboard.kicad_pcb/net');
    const netClassTpl = require('./templates/keyboard.kicad_pcb/net_class');

		return {
      'nets': nets.array.map(n => `  ${nets.format(n)}`).join('\n'),
      'net_classes': nets.array.map(n => `  (add_net "${n}")`).join('\n'),
      'modules': modules.join(''),
    };
	}

}

module.exports = PCBGenerator;
