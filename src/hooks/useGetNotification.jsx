import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetNotification = () => {
  const {
    data: notification = "",
    refetch: refetchNotification,
    isFetching: isFetchingNotification,
    isFetched,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const { data } = await AxiosSecure.post(`${API.notification}`);
        if (data.success) {
          return data?.result;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    gcTime: 0,
    refetchInterval: 60000,
  });

  return {
    notification,
    refetchNotification,
    isFetchingNotification,
    isFetched,
  };
};

export default useGetNotification;
