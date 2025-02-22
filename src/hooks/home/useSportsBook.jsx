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

      const decryptionData = await handleDecryptData(JSON.stringify(data));

      return decryptionData;
    },
    refetchInterval: 2000,
  });

  return { sports, refetchSports };
};

export default useSportsBook;
