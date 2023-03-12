import axios from "axios";

const instance = axios.create({
  baseURL: "https://ifuelv2-dev.sterlingapps.p.azurewebsites.net/api/",
});

export default instance;
