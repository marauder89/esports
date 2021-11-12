import { axios } from "../../commons";

const GPG_1_1 = async (params) => {
  return await axios("post", { method: "GPG_1_1", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const GPG_1_2 = async (params) => {
  return await axios("post", { method: "GPG_1_2", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const GPG_1_3 = async (params) => {
  return await axios("post", { method: "GPG_1_3", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

export { GPG_1_1, GPG_1_2, GPG_1_3 };
