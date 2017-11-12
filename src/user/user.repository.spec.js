"use strict";

var proxyquire = require("proxyquire"),
    sinon = require("sinon");

describe('user repository', function() {

  var userRepository,
      mockDependencies,
      mockDb,
      mockFind,
      mockToArray;

  describe('getAll', function() {

    it('returns all users', function() {

      mockDependencies = {
        "../data": {
          getDb: sinon.stub()
        }
      };

      mockDb = {
        users: {
          find: function() {
            return this;
          },
          toArray: function() {
            return this;
          }
        }
      };

      mockFind = sinon.spy(mockDb.users, "find");
      mockToArray = sinon.spy(mockDb.users, "toArray");

      mockDependencies["../data"].getDb.yields(null, mockDb);
      userRepository = proxyquire("./user.repository", mockDependencies);

      userRepository.getAll();

      expect(mockDb.users.find.withArgs({}).callCount).toBe(1);
      expect(mockDb.users.toArray.callCount).toBe(1);

    });

  });

});
