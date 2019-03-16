module.exports = (type, num) => {
  const prefix = type
    .split('')
    .reduce((acc, v, i) => acc + type.charCodeAt(i), 0)
    .toString(16);
  return `${prefix}${num.toString(16)}`.toUpperCase();
};
