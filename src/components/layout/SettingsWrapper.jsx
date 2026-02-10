import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import { useSettingsMutation } from "../../hooks/settings";

const SettingsWrapper = ({ children }) => {
  const { token } = useContextState();
  const { mutate, isSuccess } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!isSuccess) {
    return null;
  }

  return children;
};

export default SettingsWrapper;
