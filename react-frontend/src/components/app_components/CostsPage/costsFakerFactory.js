
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
date: faker.lorem.sentence(""),
linkedAccountId: faker.lorem.sentence(""),
linkedAccountName: faker.lorem.sentence(""),
service: faker.lorem.sentence(""),
usageType: faker.lorem.sentence(""),
itemDescription: faker.lorem.sentence(""),
resourceName: faker.lorem.sentence(""),
resourceId: faker.lorem.sentence(""),
availabilityZone: faker.lorem.sentence(""),
unitPrice: faker.lorem.sentence(""),
usageQuantity: faker.lorem.sentence(""),
amount: faker.lorem.sentence(""),
previousMonthAmount: faker.lorem.sentence(""),
monthlyGrowth: faker.lorem.sentence(""),
tagDepartment: faker.lorem.sentence(""),
tagApplication: faker.lorem.sentence(""),
tagEnvironment: faker.lorem.sentence(""),
tagOwner: faker.lorem.sentence(""),
tagProject: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
