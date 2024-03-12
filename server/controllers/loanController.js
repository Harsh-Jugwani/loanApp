const Loan = require("../models/loan");

const createLoan = async (req, res) => {
  try {
    const { uname, email, loanAmount, term } = req.body;
    if (!uname) {
      return res.json({
        error: "name is required",
      });
    }

    if (!loanAmount) {
      return res.json({
        error: "amount is required",
      });
    }
    if (!term) {
      return res.json({
        error: "Term is required",
      });
    }
    const exist = await Loan.findOne({ email });
    //if email already exists
    if (exist) {
      return res.json({
        error: "Loan regarding this email is already is in progress",
      });
    }

    const loan = await Loan.create({
      uname,
      email,
      loanAmount,
      term,
    });
    return res.json(loan);
  } catch (error) {}
};

const getApplicants = async (req, res) => {
  try {
    const loan = await Loan.find({});
    return res.json({ loan });
  } catch (error) {
    return res.json({ error });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { state, _id, status } = req.body;
 
    const loan = await Loan.findOne({ _id: _id });

    loan.state = status;

    await loan.save();
    return res.json({
      success: "succesfully updated",
    });
  } catch (error) {}
};
const getStatus = async (req, res) => {
  try {
    const { email } = req.body;
    const exist = await Loan.findOne({ email });
    if (!exist) {
      return res.json({
        err: "email not exist",
      });
    }
    return res.json({ exist });
  } catch (error) {}
};

const repay = async (req, res) => {
  try {
    const { amount, email } = req.body;
    console.log(req.body);
    const loan = await Loan.findOne({ email });

    // loan.loanAmount = loanAmount-amount;
    let remaining = parseInt(loan.loanAmount);
    if (remaining < 0) return res.json({ err: "Payed" });

    loan.loanAmount = remaining - amount;
    console.log(loan.loanAmount);
    loan.loanAmount = loan.loanAmount.toString();
    let remain_term = parseInt(loan.term);
    loan.term = remain_term - 1;

    loan.term = loan.term.toString();
    console.log(loan.term);

    await loan.save();
    return res.json({ loan });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { createLoan, getApplicants, updateStatus, getStatus, repay };
