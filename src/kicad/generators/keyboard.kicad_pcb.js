const Generator = require('../../files/generators/index');
const Nets = require('./templates/keyboard.kicad_pcb/nets');
const Switch = require('./templates/keyboard.kicad_pcb/switch');
const Diode = require('./templates/keyboard.kicad_pcb/diode');
const Frame = require('./templates/keyboard.kicad_pcb/frame');
const Plane = require('./templates/keyboard.kicad_pcb/plane');
const Crystal = require('./templates/keyboard.kicad_pcb/crystal');
const Cap = require('./templates/keyboard.kicad_pcb/cap');
const Resistor = require('./templates/keyboard.kicad_pcb/resistor');
const Reset = require('./templates/keyboard.kicad_pcb/reset');
const Micro = require('./templates/keyboard.kicad_pcb/Micro');
const USB = require('./templates/keyboard.kicad_pcb/usb');

const formatName = require('./name');
const pinPadMap = require('./pin-pad-map');

class PCBGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.kicad_pcb'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const nets = new Nets();
		const nameSet = new Set();
    const modules = [];
    const gap = 5;

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
            theSwitch.setPad(1, `/col${col}`);
            theSwitch.connectPads(2, diode, 2);

            modules.push(theSwitch.render(k.pos.x, k.pos.y, k.rotation));
            const dx = k.pos.x + k.size.w - 0.5;
            modules.push(diode.render(dx, k.pos.y, 90));
          });
        }
      }
    }

    modules.push(new Frame(keyboard).render(gap));
    modules.push(new Plane(keyboard, 'VCC', 'F.Cu').render(gap + 1));
    modules.push(new Plane(keyboard, 'GND', 'B.Cu').render(gap + 1));

    const limitx = (keyboard.bounds.max.x * 1905) / 100 + 5;

    const xCap1 = new Cap(nets);
    const xc1x = limitx + 5;
    const xc1y = 20;

    const xCap2 = new Cap(nets);
    const xc2x = limitx + 15;
    const xc2y = 20;

    const crystal = new Crystal(nets);
    const xx = limitx + 10;
    const xy = 20;

    crystal.connectPads(1, xCap1, 1);
    crystal.connectPads(2, xCap2, 1);

    modules.push(xCap1.render(xc1x, xc1y));
    modules.push(xCap2.render(xc2x, xc2y));
    modules.push(crystal.render(xx, xy));

    // microcontroller
    const r1 = new Resistor('10k', nets);
    r1.setPad(2, 'VCC');
    const r1x = limitx + 14;
    const r1y = -5;

    const reset = new Reset(nets);
    const rx = limitx + 14;
    const ry = -10;
    reset.connectPads(2, r1, 1);

    const r2 = new Resistor('10k', nets);
    r2.setPad(2, 'GND');
    const r2x = limitx + 25;
    const r2y = 8;

    const r3 = new Resistor('22u', nets);
    const r3x = limitx + 5;
    const r3y = 8;

    const r4 = new Resistor('22u', nets);
    const r4x = limitx + 5;
    const r4y = 12;

    const usb = new USB(nets);
    const ux = limitx / 2;
    const uy = gap - 2;

    r3.connectPads(2, usb, 2);
    r4.connectPads(2, usb, 3);

    const uCap1 = new Cap(nets); // old C8
    const uc1x = limitx + 5;
    const uc1y = 5;

    const micro = new Micro(nets);
    const mx = limitx + 14;
    const my = 5;

    micro.connectPads(3, r3, 1);
    micro.connectPads(4, r4, 1);
    micro.connectPads(6, uCap1, 1);
    micro.connectPads(13, r1, 1);
    micro.connectPads(16, xCap1, 1);
    micro.connectPads(17, xCap2, 1);
    micro.connectPads(33, r2, 1);

    [...Array(keyboard.rows)].forEach((_, r) => {
      const pad = pinPadMap[keyboard.pins.row[r]];
      micro.setPad(pad, `/row${r}`);
    });

    [...Array(keyboard.cols)].forEach((_, c) => {
      const pad = pinPadMap[keyboard.pins.col[c]];
      micro.setPad(pad, `/col${c}`);
    });


    modules.push(r1.render(r1x, r1y));
    modules.push(reset.render(rx, ry));
    modules.push(r2.render(r2x, r2y));
    modules.push(r3.render(r3x, r3y));
    modules.push(r4.render(r4x, r4y));
    modules.push(usb.render(ux, uy));
    modules.push(uCap1.render(uc1x, uc1y));
    modules.push(micro.render(mx, my));

    // decoupling capacitors
    [...Array(4)].forEach((_, i) => {
      const dCap = new Cap(nets);
      dCap.setPad(1, 'VCC');
      modules.push(dCap.render(limitx + 5 + (i*5), 30));
    });

		return {
      'nets':        nets.array.map(n => `  ${nets.format(n)}`).join('\n'),
      'net_classes': nets.array.map(n => `  (add_net "${n}")`).join('\n'),
      'modules':     modules.join(''),
    };
	}

}

module.exports = PCBGenerator;
