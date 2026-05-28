const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("costs service", async () => {
  let thisService;
  let costCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("costs");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (costs)");
  });

  describe("#create", () => {
    const options = {"date":"new value","linkedAccountId":"new value","linkedAccountName":"new value","service":"new value","usageType":"new value","itemDescription":"new value","resourceName":"new value","resourceId":"new value","availabilityZone":"new value","unitPrice":"new value","usageQuantity":"new value","amount":"new value","previousMonthAmount":"new value","monthlyGrowth":"new value","tagDepartment":"new value","tagApplication":"new value","tagEnvironment":"new value","tagOwner":"new value","tagProject":"new value"};

    beforeEach(async () => {
      costCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cost", () => {
      assert.strictEqual(costCreated.date, options.date);
assert.strictEqual(costCreated.linkedAccountId, options.linkedAccountId);
assert.strictEqual(costCreated.linkedAccountName, options.linkedAccountName);
assert.strictEqual(costCreated.service, options.service);
assert.strictEqual(costCreated.usageType, options.usageType);
assert.strictEqual(costCreated.itemDescription, options.itemDescription);
assert.strictEqual(costCreated.resourceName, options.resourceName);
assert.strictEqual(costCreated.resourceId, options.resourceId);
assert.strictEqual(costCreated.availabilityZone, options.availabilityZone);
assert.strictEqual(costCreated.unitPrice, options.unitPrice);
assert.strictEqual(costCreated.usageQuantity, options.usageQuantity);
assert.strictEqual(costCreated.amount, options.amount);
assert.strictEqual(costCreated.previousMonthAmount, options.previousMonthAmount);
assert.strictEqual(costCreated.monthlyGrowth, options.monthlyGrowth);
assert.strictEqual(costCreated.tagDepartment, options.tagDepartment);
assert.strictEqual(costCreated.tagApplication, options.tagApplication);
assert.strictEqual(costCreated.tagEnvironment, options.tagEnvironment);
assert.strictEqual(costCreated.tagOwner, options.tagOwner);
assert.strictEqual(costCreated.tagProject, options.tagProject);
    });
  });

  describe("#get", () => {
    it("should retrieve a cost by ID", async () => {
      const retrieved = await thisService.Model.findById(costCreated._id);
      assert.strictEqual(retrieved._id.toString(), costCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"date":"updated value","linkedAccountId":"updated value","linkedAccountName":"updated value","service":"updated value","usageType":"updated value","itemDescription":"updated value","resourceName":"updated value","resourceId":"updated value","availabilityZone":"updated value","unitPrice":"updated value","usageQuantity":"updated value","amount":"updated value","previousMonthAmount":"updated value","monthlyGrowth":"updated value","tagDepartment":"updated value","tagApplication":"updated value","tagEnvironment":"updated value","tagOwner":"updated value","tagProject":"updated value"};

    it("should update an existing cost ", async () => {
      const costUpdated = await thisService.Model.findByIdAndUpdate(
        costCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(costUpdated.date, options.date);
assert.strictEqual(costUpdated.linkedAccountId, options.linkedAccountId);
assert.strictEqual(costUpdated.linkedAccountName, options.linkedAccountName);
assert.strictEqual(costUpdated.service, options.service);
assert.strictEqual(costUpdated.usageType, options.usageType);
assert.strictEqual(costUpdated.itemDescription, options.itemDescription);
assert.strictEqual(costUpdated.resourceName, options.resourceName);
assert.strictEqual(costUpdated.resourceId, options.resourceId);
assert.strictEqual(costUpdated.availabilityZone, options.availabilityZone);
assert.strictEqual(costUpdated.unitPrice, options.unitPrice);
assert.strictEqual(costUpdated.usageQuantity, options.usageQuantity);
assert.strictEqual(costUpdated.amount, options.amount);
assert.strictEqual(costUpdated.previousMonthAmount, options.previousMonthAmount);
assert.strictEqual(costUpdated.monthlyGrowth, options.monthlyGrowth);
assert.strictEqual(costUpdated.tagDepartment, options.tagDepartment);
assert.strictEqual(costUpdated.tagApplication, options.tagApplication);
assert.strictEqual(costUpdated.tagEnvironment, options.tagEnvironment);
assert.strictEqual(costUpdated.tagOwner, options.tagOwner);
assert.strictEqual(costUpdated.tagProject, options.tagProject);
    });
  });

  describe("#delete", async () => {
    it("should delete a cost", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const costDeleted = await thisService.Model.findByIdAndDelete(costCreated._id);
      assert.strictEqual(costDeleted._id.toString(), costCreated._id.toString());
    });
  });
});