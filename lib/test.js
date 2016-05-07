'use strict';

// Documentation: http://chaijs.com/api/bdd/

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Msgfy = require('./msgfy');

var serviceName = 'E:joaosteing@gmail.com';


describe('Message Application', function () {
  var msg;

  beforeEach(function () {
    msg = new Msgfy(serviceName);
  });

  it('should exist', function () {
    expect(msg).to.be.an('object');
  });

  it('should be instanciable', function () {
    expect(msg).to.be.an.instanceof(Msgfy);
  });

  it('should have a service', function () {
    expect(msg.service).to.equal(serviceName);
  });

  it('should have a dictionary', function () {
    expect(msg.dictionary).to.be.an('object');
    expect(msg.dictionary.morning).to.be.an('array');
    expect(msg.dictionary.morning.length).to.be.above(0);
    expect(msg.dictionary.afternoon).to.be.an('array');
    expect(msg.dictionary.afternoon.length).to.be.above(0);
    expect(msg.dictionary.evening).to.be.an('array');
    expect(msg.dictionary.evening.length).to.be.above(0);
  });

  describe('#send()', function () {
    it('should exist', function () {
      expect(msg.send).to.be.a('function');
    });

    it('should run osa script', function () {
      var spy = sinon.spy(msg, 'osa');
      msg.send('test', '+55xx12345123');
      expect(spy.calledOnce).to.equal(true);
    });

    it('should have a send script available', function () {
      expect(msg.sendScript).to.be.a('function');
    });
  });

  describe('#getRandomTime()', function () {
    it('should exist', function () {
      expect(msg.getRandomTime).to.be.a('function');
    });

    it('should get an object with random hour and minute', function () {
      var randomTime = msg.getRandomTime();

      expect(randomTime).to.have.property('hour');
      expect(randomTime.hour).to.be.a('number');

      expect(randomTime).to.have.property('minute');
      expect(randomTime.minute).to.be.a('number');
    });
  });

  describe('#getMessageText()', function () {
    var randomTime;

    before(function () {
      randomTime = msg.getRandomTime({ silent: true });
    });

    it('should exist', function () {
      expect(msg.getMessageText).to.be.a('function');
    });

    it('should figure out the greeting time', function () {
      var spy = sinon.spy(msg, 'greetingTime');
      msg.getMessageText(randomTime);
      expect(spy.calledOnce).to.equal(true);
    });

    it('should return a message', function () {
      expect(msg.getMessageText(randomTime)).to.be.a('string');
    });
  });

  describe('#greetingTime()', function () {
    it('should exists', function () {
      expect(msg.greetingTime).to.be.a('function');
    });

    it('should support morning', function () {
      for (var i = 0; i < 12; i++) {
        expect(msg.greetingTime(i)).to.equal('morning');
      }
    });

    it('should support afternoon', function () {
      for (var i = 12; i < 23; i++) {
        expect(msg.greetingTime(i)).to.equal('afternoon');
      }
    });

    it('should support evening', function () {
      expect(msg.greetingTime(23)).to.equal('evening');
      expect(msg.greetingTime(24)).to.equal('evening');
    });
  });
});
