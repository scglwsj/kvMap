const current = {};
const events = [];
const valueCount = {};

function get(key) {
  return current[key] || null;
}

function set(key, value) {
  current[key] && (valueCount[current[key]]--);
  value && (valueCount[value] = (valueCount[value] || 0) + 1);
  if (events[0]) {
    let eventValue = events[events.length - 1][key];
    if (eventValue) {
      eventValue.current = value;
    } else {
      events[events.length - 1][key] = { current: value, origin: current[key] };
    }
  }
  current[key] = value;
}

function remove(key) {
  set(key, null);
}

function count(value) {
  return valueCount[value] || 0;
}
  
function begin() {
  events.push({});
}

function rollback() {
  const pop = events.pop();
  pop && Object.keys(pop).forEach(key => {
    const { current: currentValue, origin } = pop[key];
    currentValue && valueCount[currentValue]--;
    origin && valueCount[origin]++;
    current[key] = origin;
  });
}
  
function commit() {
  while (events.length) {
    events.pop();
  }
}

module.exports = { get, set, count, begin, rollback, commit, delete: remove };
