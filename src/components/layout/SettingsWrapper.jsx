import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import { useSettingsMutation } from "../../hooks/settings";
import { API } from "../../api";

const SettingsWrapper = ({ children }) => {
  const { token } = useContextState();
  const { mutate } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!API.login) {
    return null;
  }

  return children;
};

export default SettingsWrapper;
