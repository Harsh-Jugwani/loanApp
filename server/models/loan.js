const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//building the loan schema...
const loanSchema = new Schema({
  uname: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },

  loanAmount: {
    type: String,
    required: [true, "loan-amount is required"],
    unique:false
  },
  term: {
    type: String,
    required: [true, "term is required"],
  },
  state: {
    type: String,
    enum: ["PENDING", "APPROVED", "PAID", "REJECTED"],
    default: "PENDING",
  },
});

const loanModel = mongoose.model("loan", loanSchema);
module.exports = loanModel;
