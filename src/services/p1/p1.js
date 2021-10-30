import { default as axios } from "../../commons/axios/interceptor";

const LGA_1_1 = async (params) => {
  return await axios("post", { method: "LGA_1_1", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const LGA_1_2 = async (params) => {
  return await axios("post", { method: "LGA_1_2", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

const LGA_1_3 = async (params) => {
  return await axios("post", { method: "LGA_1_3", param: params }).then((res) => {
    return JSON.parse(res.data);
  });
};

export { LGA_1_1, LGA_1_2, LGA_1_3 };
