import CasinoCard from "../../components/ui/CasinoCard/CasinoCard";
import useRoyalCasino from "../../hooks/useRoyalCasino";

const RoyalCasino = () => {
  /* Get royal casino */
  const { royalCasino } = useRoyalCasino();

  return (
    <>
      <CasinoCard games={royalCasino} title="Royal" />
    </>
  );
};

export default RoyalCasino;
