import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useSportsVideo = () => {
  return useMutation({
    mutationKey: ["iframeVideo"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.accessToken, payload);
      return data;
    },
  });
};
