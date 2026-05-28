const costs = require("./costs/costs.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(costs);
    // ~cb-add-configure-service-name~
};
