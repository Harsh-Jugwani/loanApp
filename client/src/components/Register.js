import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import bk from "../utils/65eedf6aa284c5.37667739Processed.png";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    uname: "",
    email: "",
    password: "",
  });
  const HandleRegister = async (e) => {
    e.preventDefault();

    const { uname, email, password } = data;
    try {
      const { data } = await axios.post("/api/v1/register", {
        uname,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registered Successfully...");
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div>
      <img src={bk} alt="" className="w-screen h-screen absolute" />
      <form
        onSubmit={HandleRegister}
        className="h-auto  md:w-3/12 w-9/12 bg-black m-36 mt-20 mx-auto right-0 left-0 bg-opacity-75 rounded-xl absolute"
      >
        <h3 className="p-5 text-red-800 font-bold text-2xl md:text-xl cursor-pointer">
          Register
        </h3>
        <input
          type="text"
          placeholder="Enter your name..."
          value={data.uname}
          className="mx-6 my-3 p-2 bg-slate-500 rounded-lg"
          onChange={(e) => setData({ ...data, uname: e.target.value })}
        />

        <input
          type="email"
          placeholder="Enter your email..."
          value={data.email}
          className="mx-6 my-3 p-2 bg-slate-500 rounded-lg"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter your password..."
          value={data.password}
          className="mx-6 my-3 p-2 bg-slate-500 rounded-lg"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button type="submit" className="mx-6 my-3 p-2 bg-blue-700 rounded-lg">
          Submit
        </button>
        <p className="p-4 text-green-700">
          Already registered{" "}
          <span onClick={() => navigate("/login")}>Sign in </span> Now.
        </p>
      </form>
    </div>
  );
};

export default Register;
