const EventEmitter = require('events');
const fs = require('fs');
const test = require('tape');
const fromStream = require('./index');

test('Read LICENSE.txt', t => {
  t.plan(2);
  const stream = fs.createReadStream('LICENSE.txt',{encoding:'utf8'});
  const source = fromStream(stream);
  let length = 0;
  source(0, (type, data) => {
    if (type === 1) length += data.length;
    if (type === 2) {
      t.false(data);
      t.equal(length, 1088);
    }
  });
});

test('Manual stream with error', t => {
  t.plan(2);
  const stream = new EventEmitter();
  const source = fromStream(stream);
  setTimeout(() => stream.emit('data', 'First'), 100);
  setTimeout(() => stream.emit('data', 'Second'), 200);
  setTimeout(() => stream.emit('error', 'Error'), 300);
  let datas = [];
  source(0, (type, data) => {
    if (type == 1) datas.push(data);
    if (type == 2) {
      t.equal(data, 'Error');
      t.same(datas, ['First', 'Second']);
    }
  });
});
