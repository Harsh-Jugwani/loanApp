const express = require("express");
const {
  createLoan,
  getApplicants,
  updateStatus,
  getStatus,
  repay,
} = require("../controllers/loanController");
const loan_router = express.Router();

// to create the loan
loan_router.post("/createLoan", createLoan);

// to get the all applicants
loan_router.get("/getApplicants", getApplicants);

// to update the status of Applicants
loan_router.put("/update", updateStatus);

// to get the status of application
loan_router.post("/getStatus", getStatus);

//to create a loan repayment
loan_router.put("/repay", repay);

module.exports = loan_router;
