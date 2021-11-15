import { axios } from "../../commons";

const IER_1_1 = async (params) => {
  return await axios("post", { method: "IER_1_1", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const IER_1_2 = async (params) => {
  return await axios("post", { method: "IER_1_2", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const IER_1_3 = async (params) => {
  return await axios("post", { method: "IER_1_3", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

export { IER_1_1, IER_1_2, IER_1_3 };
