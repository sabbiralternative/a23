import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosInstance } from "../lib/AxiosInstance";

const useSBCashOut = () => {
  return useMutation({
    mutationKey: ["sb_cashout"],
    mutationFn: async (payload) => {
      const { data } = await AxiosInstance.post(`${API.sb_cashout}`, payload);
      return data;
    },
  });
};

export default useSBCashOut;
