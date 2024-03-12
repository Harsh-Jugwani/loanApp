import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";


const LoanRepayment = () => {
  const email = localStorage.getItem("email");
  const [data, setData] = useState();
  const [amount, setAmount] = useState();

  const handleSubmit_PayLoan = async (e) => {
    e.preventDefault();
    await axios.put("/api/v1/repay", { amount, email });
  };

  useEffect(() => {
    axios.post("/api/v1/getStatus", { email }).then(function (res) {
      setData(res.data.exist);
    });
  }, []);

  if (!data) return;

  return (
    <div>
      <HeaderUser />

      <div className="text-center">
        <h1 className="text-3xl font-serif font-semibold mb-5">
          Pay your Loan EMI
        </h1>
        <form onSubmit={handleSubmit_PayLoan}>
          <input
            type="number"
            placeholder="Enter the amount"
            min={parseInt(data.loanAmount / data.term)}
            max={data.loanAmount}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="border border-black rounded-md mb-2 py-2 text-center bg-gray-800 text-white w-64 h-11"
          />
          <br />
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg m-2">
            Proceed
          </button>
        </form>

        {parseInt(data.loanAmount) && (
          <h1>
            Hi {email},<br />
            You need too pay the amount:{data.loanAmount}Rs. in {data.term}{" "}
            weeks. <br /> so the weekly installment amount comes to be{" "}
            {parseInt(data.loanAmount / data.term)}Rs.
          </h1>
        )}

        <h1>
          {parseInt(data.loanAmount)
            ? "PENDING"
            : "Dear user,you have successfully paid the loan.Thank you for choosing XYZ Bank"}
        </h1>
      </div>
    </div>
  );
};

export default LoanRepayment;
