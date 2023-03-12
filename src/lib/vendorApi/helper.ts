import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
// import { useIdleTimer } from "react-idle-timer";
import { toast, ToastContainer } from "react-toastify";
import { decrypt, encrypt } from "./crypto";
import { useNavigate } from "react-router-dom";
// import { logIn, logOut } from "../redux/reducers/usersSlice";
import { useEffect } from "react";
// import imageToBase64 from "image-to-base64";

export const AsyncGetItem = async (title) => {
  return localStorage.getItem(title)
    ? JSON.parse(await decrypt(localStorage.getItem(title)))
    : null;
};
export const AsyncSetItem = async (title, data) => {
  const encryptData = await encrypt(JSON.stringify(data));
  localStorage.setItem(title, encryptData);
};
export const AsyncRemove = async (title) => {
  localStorage.removeItem(title);
};
export const AsyncGetItemSession = async (title) => {
  return sessionStorage.getItem(title)
    ? JSON.parse(await decrypt(sessionStorage.getItem(title)))
    : null;
};
export const AsyncSetItemSession = async (title, data) => {
  const encryptData = await encrypt(JSON.stringify(data));
  sessionStorage.setItem(title, encryptData);
};
export const AsyncRemoveSession = async (title) => {
  sessionStorage.removeItem(title);
};

//http response codes
export default class responseCodes {
  static response_99 = "99"; //error
  static response_00 = "00"; //success
  static response_401 = 401; //unauthorized
  static response_05 = "05"; //
  static response_04 = "04"; //
  static response_03 = "03"; //
  static response_01 = "01"; //
}

export const useCustomeToast = () => {
  const notify = (msg) => {
    toast(msg, {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });
  };
//   const ToastContainers = () => <ToastContainer />;

//   return { ToastContainers, notify };
};

// export const useColorMode = () => {
//   const theme = useSelector((state) => state.theme);
//   const isDarkMode = theme?.colorMode === "dark";

//   return { isDarkMode };
// };
export const useCurrentUser = () => {
  const currentUser = useSelector(({ user }) => user);
  const { data, isLoggedIn, customerProfile } = currentUser;

  return { data, isLoggedIn, customerProfile };
};

// export const useIdle = ({ onIdle, idleTime = 1 }) => {
//   const [isIdle, setIsIdle] = useState();
//   const [timedOut, setTimeout] = React.useState();
//   const [showModal, setShowModal] = React.useState(false);

//   const handleOnIdle = (event) => {
//     if (timedOut) {
//       onIdle();
//       setShowModal(false);
//     } else {
//       setIsIdle(true);
//       setTimeout(true);
//       console.log("user is idle", event);
//       setShowModal(true);
//       console.log("Last Active", getLastActiveTime());
//       reset();
//     }

//     // onIdle();
//   };

//   const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
//     timeout: 1000 * 60 * idleTime,
//     onIdle: handleOnIdle,
//     debounce: 500,
//   });

//   return {
//     getRemainingTime,
//     getLastActiveTime,
//     isIdle,
//   };
// };
// export const useAuthService = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const refreshPage = () => {
//     navigate(0);
//   };

//   const handleLogout = () => {
//     dispatch(logOut());
//     setTimeout(() => {
//       navigate("/");
//       refreshPage();
//     });
//   };
//   const handleLogIn = (data) => {
//     navigate("/");
//     dispatch(logIn(data));
//     refreshPage();
//   };

//   return { handleLogIn, handleLogout };
// };

// export const convertToBase64 = async (file) => {
//   if (file > 2000000) {
//     alert("File too large");
//     return;
//   }
//   return new Promise((resolve) => {
//     let baseURL = "";
//     // Make new FileReader
//     let reader = new FileReader();

//     // Convert the file to base64 text
//     reader.readAsDataURL(file);

//     // on reader load somthing...
//     reader.onload = () => {
//       // Make a fileInfo Object

//       baseURL = reader.result;

//       resolve(baseURL);
//     };
//   });
// };

export const greetings = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const useOtpCounter = () => {
  // const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const btnDisabled = seconds > 0 || minutes > 0 ? true : false;
  return { minutes, btnDisabled, resendOTP, seconds };
};
