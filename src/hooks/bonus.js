import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useBonusQuery = (payload) => {
  return useQuery({
    queryKey: ["bonus", payload],

    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
  });
};
export const useBonusMutation = () => {
  return useMutation({
    mutationKey: ["bonus-statement"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
  });
};
