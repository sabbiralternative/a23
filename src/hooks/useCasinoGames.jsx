import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosInstance } from "../lib/AxiosInstance";

const useCasinoGames = () => {
  const { data: casinoGames = [], refetch: refetchCasinoGames } = useQuery({
    queryKey: ["casino-games"],
    queryFn: async () => {
      const res = await AxiosInstance.post(`${API.casinoGames}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { casinoGames, refetchCasinoGames };
};

export default useCasinoGames;
