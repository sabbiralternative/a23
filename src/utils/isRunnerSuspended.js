export const isRunnerSuspended = (games, runner) => {
  if (games?.status !== "OPEN" || runner?.status !== "OPEN") {
    return "odds_suspended";
  }
};
export const isGameSuspended = (games) => {
  if (
    games?.status !== "OPEN" ||
    games?.runners?.[0]?.status !== "OPEN" ||
    games?.runners?.[1]?.status !== "OPEN"
  ) {
    return true;
  } else {
    return false;
  }
};

export const isHorseGreyhoundRunnerSuspended = (game, runner) => {
  if (game?.status !== "OPEN" || runner?.status !== "ACTIVE") {
    return "odds_suspended";
  }
};
