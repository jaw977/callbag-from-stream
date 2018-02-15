const fromStream = stream => (start, sink) => {
  if (start !== 0) return;
  const send = {
    data: x => sink(1, x),
    end: () => sink(2),
    error: x => sink(2, x),
  };
  const listeners = methodName => {
    for (let eventName in send) {
      stream[methodName](eventName, send[eventName]);
    }
  };
  sink(0, type => {
    if (type === 2) listeners('removeListener');
  });
  listeners('on');
}

module.exports = fromStream;
