import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
/* get slot api data */
const useGetSlots = () => {
  const { data: slots = [], refetch: refetchSlots } = useQuery({
    queryKey: ["slots"],

    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.slots}`);
      const data = res.data;
      if (data.status === "success") {
        return data.data;
      }
    },
  });
  return { slots, refetchSlots };
};

export default useGetSlots;
