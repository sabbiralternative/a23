import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useSinglePassbook = (marketId) => {
  const { data: singlePassbook } = useQuery({
    queryKey: ["singlePassbook"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.settledBets}/${marketId}`);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });

  return { singlePassbook };
};

export default useSinglePassbook;
