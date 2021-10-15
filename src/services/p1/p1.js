import { default as axios } from "../../commons/axios/interceptor";

const LGA_1_1 = async (params) => {
  return await axios("post", { method: "LGA_1_1", param: params });
};

const LGA_1_2 = async (params) => {
  return await axios("post", { method: "LGA_1_2", param: params });
};

const LGA_1_3 = async (params) => {
  return await axios("post", { method: "LGA_1_3", param: params });
};

export { LGA_1_1, LGA_1_2, LGA_1_3 };
