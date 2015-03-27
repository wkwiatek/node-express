var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var rewire = require('rewire');
var q = require('q');
var expect = chai.expect;
var controller = rewire('../app/controller');

chai.use(sinonChai);

describe('#chat', function() {

  beforeEach(function() {
    this.req = {
      user: 'test'
    };
    this.res = {
      render: sinon.spy()
    };
  });

  it('renders view', function() {
    controller.chat(this.req, this.res);
    expect(this.res.render).to.have.been.called;
  });

  it('renders view with user', function() {
    controller.chat(this.req, this.res);
    expect(this.res.render).to.have.been.calledWith('chat', this.req);
  });

});

describe('#songs', function() {

  beforeEach(function() {
    this.q = q.defer();
    this.getSongs = sinon.stub().returns(this.q.promise);
    this.res = {
      json: sinon.spy()
    };
    controller.__set__('getSongs', this.getSongs);
    controller.songs({
      params: {
        q: 'query'
      }
    }, this.res);
  });

  it('should call getSongs', function() {
    expect(this.getSongs).to.have.been.called;
  });

  it('responds with json', function(done) {
    var response = {};

    this.q.promise.done(function() {
      expect(this.res.json).to.have.been.calledWith(response);
      done();
    }.bind(this));

    this.q.resolve(response);
  });

});