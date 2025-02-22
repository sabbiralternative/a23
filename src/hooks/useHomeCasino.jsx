import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useHomeCasino = () => {
  const { data: homeCasino = [], refetch: refetchHomeCasino } = useQuery({
    queryKey: ["home-casino"],
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.homeCasino}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { homeCasino, refetchHomeCasino };
};

export default useHomeCasino;
