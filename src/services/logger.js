const logger = {
  info: (msg) => {
    console.log(`%c${msg}`, 'color: green');
  },
  error: (msg) => {
    console.warn(`%c${msg}`, 'color: red');
  },
}

module.exports = {
  logger,
};
