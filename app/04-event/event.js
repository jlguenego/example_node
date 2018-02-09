const EventEmitter = require('events'); // ootb module, see nodejs doc.

class JLGEmitter extends EventEmitter {}

const emitter = new JLGEmitter();
emitter.on('coucou', e => {
  console.log('hello', `${e}!`);
});




emitter.emit('coucou', 'JL');