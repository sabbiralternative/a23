/* handle place bet */
export const handlePlaceBet = (
  item,
  runner,
  betType,
  setOpenBetSlip,
  setPlaceBetValues,
  pnlBySelection,
  token,
  navigate
) => {
  if (token) {
    let price;
    let eventTypeId;
    if (
      item?.status === "OPEN" &&
      (runner?.status === "OPEN" || runner?.status === "ACTIVE")
    ) {
      const updatedPnl = [];
      item?.runners?.forEach((rnr) => {
        const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
        if (pnl) {
          updatedPnl.push({
            exposure: pnl?.pnl,
            id: pnl?.RunnerId,
            isBettingOnThisRunner: rnr?.id === runner?.id,
            name: rnr?.name,
            updatedExposure: pnl?.pnl,
          });
        } else {
          updatedPnl.push({
            exposure: 0,
            id: rnr?.id,
            isBettingOnThisRunner: rnr?.id === runner?.id,
            name: rnr?.name,
          });
        }
      });

      if (item?.btype) {
        eventTypeId = item?.eventTypeId;
        price =
          betType === "back" ? runner?.back[0].price : runner?.lay[0].price;
      } else {
        eventTypeId = item?.marketId;
        price =
          betType === "back"
            ? runner?.ex?.availableToBack?.[0]?.price
            : runner?.ex?.availableToLay?.[0]?.price;
      }
      setOpenBetSlip(true);
      setPlaceBetValues({});
      setPlaceBetValues({
        price,
        side: betType === "back" ? 0 : 1,
        selectionId: runner?.id,
        btype: item?.btype,
        eventTypeId,
        betDelay: item?.betDelay,
        marketId: item?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: item.runners.map((runner) => runner.name),
        runnerId: item.runners.map((runner) => runner.id || runner.selectionId),
        isWeak: item?.isWeak,
        maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
        isBettable: item?.isBettable,
        maxLiabilityPerBet: item?.maxLiabilityPerBet,
        exposure: updatedPnl,
        marketName: item?.name,
        eventId: item?.eventId,
        cashout: false,
      });
    }
  } else {
    navigate("/login");
  }
};
