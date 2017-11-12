"use strict";

var proxyquire = require("proxyquire"),
    sinon = require("sinon");

describe('user controller', function() {

  var userController,
      mockApp,
      mockDependencies,
      mockReq,
      mockRes;

  beforeEach(function() {

    mockApp = {
      get: sinon.stub(),
      post: sinon.stub()
    };

    mockDependencies = {
      "./user.repository": {
        getAll: sinon.stub(),
        save: sinon.stub()
      }
    };

  });

  describe('get', function() {

    beforeEach(function() {

      mockRes = {
        send: sinon.stub()
      };

      mockDependencies["./user.repository"].getAll.yields({}, "dummy users");
      mockApp.get.withArgs("/user").yields({}, mockRes);
      userController = proxyquire("./user.controller", mockDependencies);

      userController.init(mockApp);

    });

    it('calls user repository', function() {

      expect(mockDependencies["./user.repository"].getAll.callCount).toBe(1);

    });

    it('returns users', function() {

      expect(mockRes.send.withArgs("dummy users").callCount).toBe(1);

    });

  });


  describe('post', function() {

    beforeEach(function() {

      mockReq = {
        body: {
          name: "name",
          times: []
        }
      };

      mockApp.post.withArgs("/user").yields(mockReq, mockRes);
      userController = proxyquire("./user.controller", mockDependencies);
      userController.init(mockApp);

    });

    it('saves user to repository', function() {

      expect(mockDependencies["./user.repository"].save.withArgs({
        name: "name",
        times: []
      }).callCount).toBe(1);

    });

  });

});
