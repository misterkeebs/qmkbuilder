module.exports = (d) => {
  return [...Array(d)].map(_ => {
    return Math.floor(Math.random() * 16).toString(16);
  }).join('').toUpperCase();
};
