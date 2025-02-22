import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useInterNationalCasino = () => {
  const { data: intCasino = [], refetch: refetchIntCasino } = useQuery({
    queryKey: ["int-casino"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.internationalCasino}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { intCasino, refetchIntCasino };
};

export default useInterNationalCasino;
