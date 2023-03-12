import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import responseCodes, {
  AsyncGetItem,
  AsyncGetItemSession,
  // useAuthService,
  useCustomeToast,
} from "./helper";
// import { decrypt, decryptResponse, encrypt, encryptRequest } from "./crypto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { logOut } from "../redux/reducers/usersSlice";
import { endpoints } from "./vendorServiceLinks";
import { useNavigate } from "react-router-dom";

export const queryClient = new QueryClient();

// const baseUrl = import.meta.env.VITE_VENDOR_API_URL;

const rootApi = (hash, config) => {
  const instance = axios.create({
    // headers: {
    //   Accept: "text/plain",
    //   Authorization: `Bearer ${hash}`,
    //   "Content-Type": header || "application/json",
    // },
    headers: config.headers,
    // transformRequest: [
    //   (data, headers) => {
    //     return data;
    //   },
    // ],
    baseURL: import.meta.env.VITE_VENDOR_API_URL,
  });
  // uncomment transformrequest and ecrypt to enable encryption
  instance.interceptors.request.use(async function (options) {
    options.headers["x-channel"] = "web";
    options.headers["x-clientid"] = import.meta.env.REACT_APP_clientid;
    options.headers!.Authorization = `Bearer ${hash}`;
    return options;
  });
  // encrypt api calls
  instance.interceptors.request.use(
    async function (options) {
      let oldData = options.data;
      // let newData = await encryptRequest(oldData);
      let newData = oldData;
      options.data = newData;
      return options;
    },
    function (error) {
      console.log("Request error: ", error);
      return Promise.reject(error);
    }
  );
  // decryptapi calls
  instance.interceptors.response.use(
    async function (options) {
      let oldData = options.data;
      // let newData = await decrypt(oldData);
      // let newData = await decryptResponse(oldData);
      let newData = oldData;
      options.data = newData;
      return options;
    },
    async function (error) {
      // const ddd = error?.response?.data;
      // let newData = await decryptResponse(ddd);
      // console.log(newData);
      return Promise.reject(error);
    }
  );
  return instance;
};

export const useClientQuery = (key) => {
  const dispatch = useDispatch();
  const { data, isError, isLoading, refetch, error } = useQuery(
    key,
    async () => {
      const hash = (await AsyncGetItemSession("token")) || "";
      return rootApi(hash, null)
        .get(`${key}`)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          throw err?.response;
        });
    }
  );
  const navigate = useNavigate();
  // const { handleLogIn, handleLogout } = useAuthService();
  // const { notify } = useCustomeToast();
  // useEffect(() => {
  //   if (isError) {
  //     // Handle mutation errors here
  //     // console.log("new error", error.status);
  //     if (
  //       error?.status == responseCodes.response_401 ||
  //       error?.statusText == "Unauthorized"
  //     ) {
  //       // navigate("/home");
  //       notify("Your session has expired, Login to continue");
  //       //navigate to login page user here
  //       setTimeout(() => {
  //         handleLogout();
  //       }, 2000);
  //     }
  //   }
  // }, [isError, isLoading]);
  return { data, isError, isLoading, refetch };
};
export const useClientPost = (key, datas) => {
  const dispatch = useDispatch();
  const { data, isError, isLoading, refetch, error } = useQuery(
    key,
    async () => {
      const hash = (await AsyncGetItemSession("token")) || "";
      return rootApi(hash, null)
        .post(key, datas)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          throw err?.response;
        });
    }
  );
  const navigate = useNavigate();
  // const { handleLogIn, handleLogout } = useAuthService();
  // const { notify } = useCustomeToast();
  // useEffect(() => {
  //   if (isError) {
  //     // Handle mutation errors here
  //     // console.log("new error", error.status);
  //     if (
  //       error?.status === responseCodes.response_401 ||
  //       error?.statusText === "Unauthorized"
  //     ) {
  //       // navigate("/home");
  //       notify("Your session has expired, Login to continue");
  //       //navigate to login page user here
  //       setTimeout(() => {
  //         handleLogout();
  //       }, 2000);
  //     }
  //   }
  // }, [isError, isLoading]);
  return { data, isError, isLoading, refetch };
};
export const useClientFormDataPost = (key, datas) => {
  const dispatch = useDispatch();
  const { data, isError, isLoading, refetch, error } = useQuery(
    key,
    async () => {
      const hash = (await AsyncGetItemSession("token")) || "";
      return rootApi(hash, null)
        .post(key, datas, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          throw err?.response;
        });
    }
  );
  const navigate = useNavigate();
  // const { handleLogIn, handleLogout } = useAuthService();
  // const { notify } = useCustomeToast();
  // useEffect(() => {
  //   if (isError) {
  //     // Handle mutation errors here
  //     // console.log("new error", error.status);
  //     if (
  //       error?.status === responseCodes.response_401 ||
  //       error?.statusText === "Unauthorized"
  //     ) {
  //       // navigate("/home");
  //       notify("Your session has expired, Login to continue");
  //       //navigate to login page user here
  //       setTimeout(() => {
  //         handleLogout();
  //       }, 2000);
  //     }
  //   }
  // }, [isError, isLoading]);
  return { data, isError, isLoading, refetch };
};
// export const useClientMutation = (key, datas = {}, method) => {
//   const { data, isError, isLoading, mutate } = useMutation(key, async () => {
//     const hash = (await AsyncGetItem("token")) || "";
//     return rootApi()
//       [method](key, datas)
//       .then((res) =>res.data).catch(err=>{throw res.data});
//   });
//   return { data, isError, isLoading, mutate };
// };

export const useMutations = () => {
  const mutateFunction = async ({ key, method, data = {}, config }) => {
    const hash = (await AsyncGetItemSession("token")) || "";
    return rootApi(hash, config)
      [method?.toLowerCase()](key, data)
      .then((res) => res.data)
      .catch((err) => {
        console.log("error=", err);
        throw err?.response;
      });
  };
  const {
    mutate: reactQueryMuate,
    isError,
    error,
    isLoading,
  } = useMutation(mutateFunction);

  // const { handleLogout } = useAuthService();
  // useEffect(() => {
  //   if (isError) {
  //     // console.log(error.response);
  //     // Handle mutation errors here
  //     handleError(error);
  //   }
  // }, [isError, error]);
  // const { notify } = useCustomeToast();
  // useEffect(() => {
  //   if (isError) {
  //     // Handle mutation errors here
  //     // console.log("new error", error.status);
  //     if (
  //       error?.status == responseCodes.response_401 ||
  //       error?.statusText == "Unauthorized"
  //     ) {
  //       notify("Your session has expired, Login to continue");
  //       //navigate to login user here
  //       setTimeout(handleLogout, 2000);
  //     }
  //   }
  // }, [isError, isLoading]);
  const mutate = (
    { key, method, data, config },
    { onSuccess = (res) => {}, onError = (err) => {}, onSettled = () => {} }
  ) => {
    reactQueryMuate(
      { key, method, data, config },
      {
        onError,
        onSettled,
        onSuccess,
      }
    );
  };
  return { mutate, isLoading };
};

// export const UploadImageBase64 = async (payload) => {
//   // pass payload {
//   //   "postedFilebase64": "string",
//   //   "documentName": "string",
//   //   "filetype": "string"
//   // }'

//   const hash = (await AsyncGetItemSession("token")) || "";
//   return rootApi(hash, null)
//     .post(endpoints.uploadFileBase64, payload)
//     .then((res) => res.data)
//     .catch((err) => {
//       throw err?.response;
//     });
// };
// export const forceQuery = async (key) => {
//   const hash = (await AsyncGetItemSession("token")) || "";
//   return rootApi(hash, null)
//     .get(key)
//     .then((res) => res.data)
//     .catch((err) => {
//       throw err?.response;
//     });
// };
