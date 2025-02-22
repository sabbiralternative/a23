import useContextState from "../../../../hooks/useContextState";
import CardFour from "./CardFour";
import CardOne from "./CardOne";

const Card = ({ liveSports, keys }) => {
  const { sportsType } = useContextState();

  return (
    <>
      {liveSports?.[keys]?.visible && sportsType !== 0 ? (
        <CardOne keys={keys} liveSports={liveSports} />
      ) : (
        <CardFour keys={keys} liveSports={liveSports} />
      )}
    </>
  );
};

export default Card;
