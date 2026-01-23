import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API, Settings } from "../api";
import handleDecryptData from "../utils/handleDecryptData";

/* get single game details data */
const useEventDetails = (eventTypeId, eventId) => {
  const { data: eventsData, refetch: refetchEventsData } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(
        `${API.eventDetails}/${eventTypeId}/${eventId}`,
        {
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        },
      );
      const data = res.data;
      if (data?.ct) {
        return handleDecryptData(JSON.stringify(data));
      } else {
        return data;
      }
    },
    /* refetching after 2 second */
    refetchInterval: Settings.interval,
    gcTime: 0,
  });

  return { eventsData, refetchEventsData };
};

export default useEventDetails;
