export const handleLogOut = () => {
  const nonRemovalKey = ["closePopupForForever", "build_version"];
  Object.keys(localStorage).forEach((key) => {
    if (!nonRemovalKey.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};
