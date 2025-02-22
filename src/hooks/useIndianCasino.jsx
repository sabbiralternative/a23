import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
/* get indian casino */
const useIndianCasino = () => {
  const { data: indianCasino = [], refetch: refetchIndianCasino } = useQuery({
    queryKey: ["indian-casino"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.indiaCardGames}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { indianCasino, refetchIndianCasino };
};

export default useIndianCasino;
