
    module.exports = function (app) {
        const modelName = "costs";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            date: { type:  String , comment: "Date, p, false, true, true, true, true, true, true, , , , ," },
linkedAccountId: { type:  String , comment: "Linked Account Id, p, false, true, true, true, true, true, true, , , , ," },
linkedAccountName: { type:  String , comment: "Linked Account Name, p, false, true, true, true, true, true, true, , , , ," },
service: { type:  String , comment: "Service, p, false, true, true, true, true, true, true, , , , ," },
usageType: { type:  String , comment: "Usage Type, p, false, true, true, true, true, true, true, , , , ," },
itemDescription: { type:  String , comment: "Item Description, p, false, true, true, true, true, true, true, , , , ," },
resourceName: { type:  String , comment: "Resource Name, p, false, true, true, true, true, true, true, , , , ," },
resourceId: { type:  String , comment: "Resource ID, p, false, true, true, true, true, true, true, , , , ," },
availabilityZone: { type:  String , comment: "Availability Zone, p, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type:  String , comment: "Unit Price, p, false, true, true, true, true, true, true, , , , ," },
usageQuantity: { type:  String , comment: "Usage Quantity, p, false, true, true, true, true, true, true, , , , ," },
amount: { type:  String , comment: "Amount, p, false, true, true, true, true, true, true, , , , ," },
previousMonthAmount: { type:  String , comment: "Previous Month Amount, p, false, true, true, true, true, true, true, , , , ," },
monthlyGrowth: { type:  String , comment: "Monthly Growth, p, false, true, true, true, true, true, true, , , , ," },
tagDepartment: { type:  String , comment: "Tag Department, p, false, true, true, true, true, true, true, , , , ," },
tagApplication: { type:  String , comment: "Tag Application, p, false, true, true, true, true, true, true, , , , ," },
tagEnvironment: { type:  String , comment: "Tag Environment, p, false, true, true, true, true, true, true, , , , ," },
tagOwner: { type:  String , comment: "Tag Owner, p, false, true, true, true, true, true, true, , , , ," },
tagProject: { type:  String , comment: "Tag Project, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };