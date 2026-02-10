import axios from "axios";
import { Settings } from "./index";

export const getSetApis = async (setNoticeLoaded, baseUrl) => {
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";
  const { data: settingsResponse } = await axios.get(url);

  if (settingsResponse?.result) {
    // Destructure API endpoints and Settings
    const { settings = {} } = settingsResponse.result;
    // Dynamically update Settings object
    Object.keys(settings).forEach((key) => {
      if (key === "logo") {
        Settings.logoHeight = settings?.["logo"]?.height;
        Settings.logoWidth = settings?.["logo"]?.width;
        Settings.logoFormat = settings?.["logo"]?.format;
      } else {
        Settings[key] = settings[key];
      }
    });

    setNoticeLoaded(true);
  }
};
