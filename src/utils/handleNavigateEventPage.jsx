export const handleNavigateEventPage = (data, key, navigate) => {
  navigate(`/game-details/${data?.[key]?.eventTypeId}/${key}`);
};
