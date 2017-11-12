"use strict";

var proxyquire = require("proxyquire"),
    sinon = require("sinon");

describe('user repository', function() {

  var userRepository,
      mockDependencies,
      mockDb,
      mockFind,
      mockToArray;

  beforeEach(function() {

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
        },
        insert: sinon.stub()
      }
    };

    mockFind = sinon.spy(mockDb.users, "find");
    mockToArray = sinon.spy(mockDb.users, "toArray");

    mockDependencies["../data"].getDb.yields(null, mockDb);
    userRepository = proxyquire("./user.repository", mockDependencies);

  });

  describe('getAll', function() {

    it('returns all users', function() {

      userRepository.getAll();

      expect(mockDb.users.find.withArgs({}).callCount).toBe(1);
      expect(mockDb.users.toArray.callCount).toBe(1);

    });

  });

  describe('save', function() {

    it('user to database', function() {

      userRepository.save("user");
      expect(mockDb.users.insert.withArgs("user").callCount).toBe(1);

    });

  });

});
