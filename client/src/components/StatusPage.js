import { useEffect, useState } from "react";
import axios from "axios";

import HeaderUser from "./HeaderUser";

const StatusPage = () => {
  const email = localStorage.getItem("email");

  const [status, setStatus] = useState("Pending");
  useEffect(() => {
    axios.post("/api/v1/getStatus", { email }).then(function (res) {
      setStatus(res.data.exist.state);
    });
  }, []);

  return (
    <div>
      <HeaderUser />
      <div className="text-xl font-semibold">
        <h2>Hey {email}</h2>
        <h3>
          You have successfully generated your loan.
          <br />
          The state of the loan will be updated within 24 hours
          <br />
          Thank you
        </h3>
        <p className="underline">{status}</p>
      </div>
    </div>
  );
};

export default StatusPage;
