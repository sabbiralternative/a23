import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../../api";
import handleDecryptData from "../../utils/handleDecryptData";

/* get sports book */
const useSportsBook = (sportsType) => {
  const { data: sports, refetch: refetchSports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const res = await axios.get(`${API.groupSportsBook}/${sportsType || 0}`, {
        headers: {
          "Cache-Control": "public",
          "max-age": 1,
        },
      });
      const data = res.data;

      if (data?.ct) {
        return handleDecryptData(JSON.stringify(data));
      } else {
        return data;
      }
    },
    refetchInterval: 2000,
  });

  return { sports, refetchSports };
};

export default useSportsBook;
