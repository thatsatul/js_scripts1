// Using closure
function DashboardEvent1 (widgetData = {}) {
  const sendEvent = function (eventName, attrs = {}) {
    console.log('DashboardEvent1', eventName, widgetData, attrs);
  }
  return {
    sendEvent
  };
}

const a1 = new DashboardEvent1({
  type: 'story_widget'
});

const b1 = new DashboardEvent1({
  type: 'toggle_card'
});

a1.sendEvent('unit_clicked', {
  item_name: 'MSP'
});

b1.sendEvent('unit_clicked', {
  item_name: 'P2P'
});

a1.sendEvent('page_vertical_scroll');

// Prototype inheritance
function DashboardEvent2 (widgetData = {}) {
  this.widgetData = widgetData;
}

DashboardEvent2.prototype.sendEvent = function (eventName, attrs = {}) {
  console.log('DashboardEvent2', eventName, this.widgetData, attrs);
}

const a2 = new DashboardEvent2({
  type: 'story_widget'
});

const b2 = new DashboardEvent2({
  type: 'toggle_card'
});

a2.sendEvent('unit_clicked', {
  item_name: 'MSP'
});

b2.sendEvent('unit_clicked', {
  item_name: 'P2P'
});

a2.sendEvent('page_vertical_scroll');

console.log('DashboardEvent1 : are a1 and b1 sendEvents same: ', a1.sendEvent === b1.sendEvent);

console.log('DashboardEvent1 string comparison: are a1 and b1 sendEvents same: ', ''+a1.sendEvent === ''+b1.sendEvent);

console.log('DashboardEvent2 : are a2 and b2 sendEvents same: ', a2.sendEvent === b2.sendEvent);

console.log('DashboardEvent2 string comparison: are a2 and b2 sendEvents same: ', ''+a2.sendEvent === ''+b2.sendEvent);