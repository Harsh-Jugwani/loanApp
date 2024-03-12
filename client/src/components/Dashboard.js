import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HeaderUser from "./HeaderUser";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    uname: "",
    loanAmount: "",
    term: "",
  });
  //get email id which we stored during login
  const mail = localStorage.getItem("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const email = localStorage.getItem("email");
    const { uname, loanAmount, term } = data;
    try {
      //Uploading loan application data to loan schema
      const { data } = await axios.post("/api/v1/createLoan", {
        uname,
        email,
        loanAmount,
        term,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Applied Successfully...");
        navigate("/status");
      }
    } catch (error) {}
  };
  return (
    <div>
      <HeaderUser />
      <div>
        <h2 className="text-left px-5 font-bold text-lg md:text-xl ">
          Hello {mail}
        </h2>
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold md:text-4xl">
            XYZ Bank
          </h1>
          <h2 className="text-2xl font-serif font-semibold md:text-3xl">
            Loan Application Form
          </h2>
        </div>
        <div className="px-4 mt-[3%]">
          <form className="text-center" onSubmit={handleSubmit}>
            <input
              className="border border-black rounded-md mb-5 py-7 text-center bg-gray-800 text-white w-64 h-11  "
              type="text"
              placeholder="Enter the your full name"
              value={data.uname}
              onChange={(e) => setData({ ...data, uname: e.target.value })}
            />
            <br />
            <input
              className="border border-black rounded-md mb-5 py-7 text-center bg-gray-800 text-white w-64 h-11  "
              type="number"
              placeholder="Enter the loan amount"
              value={data.loanAmount}
              onChange={(e) => setData({ ...data, loanAmount: e.target.value })}
            />
            <br />
            <input
              className="border border-black rounded-md mb-5 py-7 text-center bg-gray-800 text-white w-64 h-11  "
              type="number"
              min="0"
              max="10"
              placeholder="Enter loan term (in Weeks)"
              value={data.term}
              onChange={(e) => setData({ ...data, term: e.target.value })}
            />
            <br />

            <p className="text-red-500">{Error}</p>
            <button
              className="bg-green-600 p-3 rounded-lg hover:bg-green-500 "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
