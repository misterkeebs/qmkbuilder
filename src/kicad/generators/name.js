const xlateMap = {
  "'": 'QUOTE',
  ';': 'SEMIC',
  ',': 'COMMA',
  '.': 'DOT',
  '/': 'SLASH',
  '\\': 'BSLSH',
  '-': 'MINUS',
  '=': 'EQUAL',
  '+': 'PLUS',
  '*': 'ASTRK',
  '↑': 'UP',
  '↓': 'DOWN',
  '←': 'LEFT',
  '→': 'RIGHT',
  '→': 'RIGHT',
  ']': 'OBRAC',
  '[': 'CBRAC',
}

module.exports = (name) => {
  const parts = name.split('\n');
  name = parts.length > 1 ? parts[1] : parts[0];
  name = name.split('\n')[0].replace(/ /g, '_').toUpperCase().split('_')[0];
  name = xlateMap[name] || name;
  if (!name || !name.length) {
    name = 'SPACE';
  }

  return name;
};
