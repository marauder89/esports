import { default as axios } from "../../commons/axios/interceptor";

const ier_1_1 = async (params) => {
  return await axios("post", { method: "ier_1_1", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const ier_1_2 = async (params) => {
  return await axios("post", { method: "ier_1_2", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const ier_1_3 = async (params) => {
  return await axios("post", { method: "ier_1_3", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

export { ier_1_1, ier_1_2, ier_1_3 };
