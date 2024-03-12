import { useNavigate } from "react-router-dom";
import logo from "../utils/icons8-loan-96.png";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.setItem("email", "");
    navigate("/login");
  };
  const handleAlert = () => {
    if (window.confirm("Are you sure you want to sign-out!")) {
      var txt = "You pressed OK!";
      handleSignOut();
    } else {
      var txt = "You pressed Cancel!";
    }
  };
  if (!localStorage.getItem("email")) navigate("/login");
  return (
    <div>
      <div className="flex justify-between border-b-4 items-center">
        <img className="h-16 md:h-20 ml-5" src={logo} alt="#" />
        <div className="flex list-none font-bold text-xs">
          <button
            onClick={() => {
              handleAlert();
            }}
            className="  px-2 text-[13px] mx-4 shadow-sm bg-red-700 text-white rounded-lg   py-2  cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
