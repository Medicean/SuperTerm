const UI = require('./libs/ui');
const SUPERTERM = require('./libs/superterm');
class Plugin {
  constructor(opt) {
    new UI(opt)
      .onStart((argv) => {
        return new SUPERTERM(opt, argv);
      })
  }
}

module.exports = Plugin;
