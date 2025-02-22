/* handle detect price change on game details page and based on blink color */
export const detectPriceChanges = (
  matchOdds,
  previousData,
  setPreviousData,
  setChangedPrices
) => {
  const newChangedPrices = {};

  matchOdds?.forEach((item, index) => {
    item?.runners?.forEach((runner, runnerIndex) => {
      const previousRunner = previousData[index]?.runners[runnerIndex];

      runner?.back?.forEach((backItem, backIndex) => {
        const previousBackItem = previousRunner?.back?.[backIndex];

        if (backItem?.price !== previousBackItem?.price) {
          newChangedPrices[`back-${runner?.id}-${backIndex}`] = true;
          setChangedPrices({ ...newChangedPrices });

          setTimeout(() => {
            newChangedPrices[`back-${runner?.id}-${backIndex}`] = false;
            setChangedPrices({ ...newChangedPrices });
          }, 300);
        }
      });

      runner?.lay?.forEach((layItem, layIndex) => {
        const previousLayItem = previousRunner?.lay?.[layIndex];

        if (layItem?.price !== previousLayItem?.price) {
          newChangedPrices[`lay-${runner?.id}-${layIndex}`] = true;
          setChangedPrices({ ...newChangedPrices });

          setTimeout(() => {
            newChangedPrices[`lay-${runner?.id}-${layIndex}`] = false;
            setChangedPrices({ ...newChangedPrices });
          }, 300);
        }
      });
    });
  });

  setPreviousData(matchOdds);
};
