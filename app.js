'use strict';

var CronJob = require('cron').CronJob;
var moment = require('moment');
var Msgfy = require('./lib/msgfy');
var config = require('./config');

var msg = new Msgfy(config.service);

// var cronTimePattern = '* ' + time.minute + ' ' + time.hour + ' * * 0-6';
var cronTimePattern = '*/5 * * * * 0-6';

var sendMessage = function() {
  var time = msg.getRandomTime();
  var messageInfo = 'Message sent on: ' + time.hour + ':' + time.minute;
  var message = msg.getMessageText(time);
  msg.send(message, config.her, messageInfo);
};

var job = new CronJob({
  cronTime: cronTimePattern,
  onTick: sendMessage,
  timeZone: config.timeZone
});

job.start();
