import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useRoyalCasino = () => {
  const { data: royalCasino = [], refetch: refetchRoyalCasino } = useQuery({
    queryKey: ["royal-casino"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.royalCasino}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { royalCasino, refetchRoyalCasino };
};

export default useRoyalCasino;
