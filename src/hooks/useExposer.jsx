import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

/* exposure api */
const useExposer = (eventId) => {
  const { data: exposer = {}, refetch: refetchExposure } = useQuery({
    queryKey: ["exposure"],
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.exposure}/${eventId}`);
      const data = res.data;

      if (data.success) {
        return data.result;
      }
    },
  });
  return { exposer, refetchExposure };
};

export default useExposer;
