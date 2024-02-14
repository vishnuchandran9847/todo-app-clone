import React, { useEffect, useState } from "react";
import "../../assets/Css/Custom.css";
import vector from "../../assets/Images/Vector.png";
import icon1 from "../../assets/Images/grommet-icons_google.png";

import icon2 from "../../assets/Images/Illustration Export.png";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function LogSignup() {
  const history = useNavigate();
  const [Value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);

      history('/dashboard');
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="flex ">
        <div className="flex-1 flex-col  p-10">
          <div>
            <img className="" src={vector} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center mt-32">
            <div className="">
              <h4 className="font-bold text-lg">LOGIN</h4>
            </div>
            <div className="mt-5">
              <h6 className="font-medium text-sm text-black/55 text-justify max-w-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
                feugiat vitae faucibus nibh dolor dui.
              </h6>
            </div>

            <button
              onClick={handleClick}
              className="flex items-center justify-center gap-2 bg-[#597EF7] px-2 py-2 rounded-md mt-4"
            >
              <div className="bg-white p-1">
                <img className="w-8" src={icon1} alt="" />
              </div>
              <h6>Sign in using Google</h6>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img src={icon2} alt="" className="h-[100vh] w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default LogSignup;
