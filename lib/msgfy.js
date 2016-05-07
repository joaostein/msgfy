/*globals Application */

'use strict';

var Msgfy = function (serviceName) {
  this.service = serviceName;
  this.osa = require('osa');
  this.dictionary = require('./dictionary');
};

Msgfy.prototype.send = function (message, buddy, messageInfo) {
  this.osa(this.sendScript, message, buddy, this.service, function () {
    console.log('========================');
    console.log('Message:', message);
    console.log('To:', buddy);
    console.log(messageInfo + ' / ' + new Date());
    console.log('========================');
  });
};

Msgfy.prototype.sendScript = function (message, buddy, service) {
  var messagesApp = Application('Messages');
  var iMessageService = messagesApp.services.byName(service);

  var her = iMessageService.buddies.whose({
    handle: { _equals: buddy }
  });

  messagesApp.send(message, { to: her[0] });
};

Msgfy.prototype.getMessageText = function (time) {
  var dayPeriod = this.greetingTime(time.hour);

  var possibleMessages = this.dictionary[dayPeriod];
  var randomMessage = Math.floor(Math.random() * possibleMessages.length);

  return possibleMessages[randomMessage];
};

Msgfy.prototype.getRandomTime = function (options) {
  var time = {
    hour: Math.floor(Math.random() * 17) + 6,
    minute: Math.floor(Math.random() * 58) + 1
  };

  if (options && !options.silent) {
    console.log('Randon time selected: ' + time.hour + ':' + time.minute);
  }

  return time;
};

Msgfy.prototype.greetingTime = function (currentHour) {
  var g;

  // 24hr time to split the afternoon
  var split_afternoon = 12;
  // 24hr time to split the evening
  var split_evening = 22;

  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    g = 'afternoon';
  } else if(currentHour >= split_evening) {
    g = 'evening';
  } else {
    g = 'morning';
  }

  return g;
};

module.exports = Msgfy;
