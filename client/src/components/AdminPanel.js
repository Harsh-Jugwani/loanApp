import axios from "axios";
import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");
  if (email !== "admin@gmail.com") navigate("/login");
  useEffect(() => {
    //making get request to get all user who applied for loan
    axios.get("/api/v1/getApplicants").then(function (response) {
      setData(response.data.loan);
    });
  }, []);

  //applying extra layer of security
  const handleAlertApprove = (state, _id) => {
    if (window.confirm("Are you sure you want to approve the loan!")) {
      var txt = "You pressed OK!";
      handleUpdateApprove(state, _id, "APPROVED");
    } else {
      var txt = "You pressed Cancel!";
    }
  };
   //applying extra layer of security
  const handleAlertReject = (state, _id) => {
    if (window.confirm("Are you sure you want to reject the loan!")) {
      var txt = "You pressed OK!";
      handleUpdateReject(state, _id, "REJECTED");
    } else {
      var txt = "You pressed Cancel!";
    }
  };
  const handleUpdateApprove = async (state, _id, status) => {
    await axios.put("/api/v1/update", {
      state,
      _id,
      status,
    });
  };
  const handleUpdateReject = async (state, _id, status) => {
     await axios.put("/api/v1/update", {
      state,
      _id,
      status,
    });
  };

  return (
    <div>
      <HeaderAdmin />
      <h2 className="text-left px-5 font-bold md:text-2xl text-xl ">
        Hello {email}
      </h2>
      <div className="flex flex-wrap md:ml-[20%] mx-[10%]">
        {/* mapping our each loan request */}
        {data.map((val) => {
          return (
            <div
              key={val._id}
              className="h-1/2 md:w-2/6 w-80  p-2 m-2 bg-slate-600 rounded-md "
            >
              <ul>
                <li>Name: {val.uname}</li>
                <li>Email: {val.email}</li>
                <li>Loan Amount: {val.loanAmount}</li>
                <li>Term(in Weeks): {val.term}</li>
                <li>Status: {val.state}</li>
                <div className="flex justify-evenly">
                  <button
                    className="h-auto w-auto bg-green-500 text-white p-1 rounded-lg"
                    onClick={() => {
                      handleAlertApprove(val.state, val._id);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="h-auto w-auto bg-red-500 text-white p-1 rounded-lg"
                    onClick={() => {
                      handleAlertReject(val.state, val._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
