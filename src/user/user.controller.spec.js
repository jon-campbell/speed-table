"use strict";

var proxyquire = require("proxyquire"),
    sinon = require("sinon");

describe('user controller', function() {

  var userController,
      mockApp,
      mockDependencies,
      mockRes;

  describe('get', function() {

    beforeEach(function() {

      mockApp = {
        get: sinon.stub()
      };

      mockDependencies = {
        "./user.repository": {
          getAll: sinon.stub()
        }
      };

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

});
