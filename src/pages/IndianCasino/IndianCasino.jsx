import useIndianCasino from "../../hooks/useIndianCasino";
import CasinoCard from "../../components/ui/CasinoCard/CasinoCard";

const IndianCasino = () => {
  /* Get indian casino */
  const { indianCasino } = useIndianCasino();

  return (
    <>
      <CasinoCard games={indianCasino} title="Indian" />
    </>
  );
};

export default IndianCasino;
