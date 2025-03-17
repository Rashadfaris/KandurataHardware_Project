import mongoose from "mongoose";

// Define the schema for the driver
const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nicNumber: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  homeAddress: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  vehicleModel: { type: String, required: true }
});

const driverModel = mongoose.models.driver || mongoose.model("driver", driverSchema);

export default driverModel;
