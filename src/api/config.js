import axios from "axios";
import { API, Settings } from "./index";

export const getSetApis = async (setNoticeLoaded, baseUrl) => {
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";
  const { data: settingsResponse } = await axios.get(url);
  const { data: dataResponse } = await axios.post(
    "https://api7.live/api/exchange/diamond/settings",
  );

  if (dataResponse?.result) {
    const { endpoint = {}, ...rest } = dataResponse.result;
    // Dynamically update API object
    Object.keys(endpoint).forEach((key) => {
      API[key] = endpoint[key];
    });

    Settings.whatsapplink = rest.whatsapplink;
    Settings.instagramLink = rest.instagramLink;
    Settings.telegramLink = rest.telegramLink;
    Settings.branchWhatsapplink = rest.branchWhatsapplink;
    Settings.pixel = rest.pixel;
    Settings.liveUrl = rest.liveUrl;
    Settings.pixel2 = rest.pixel2;
    Settings.whatsappFloatIconVisible = rest.whatsappFloatIconVisible;
    Settings.referral_create_account = rest.referral_create_account;
    Settings.bet_delay = rest.bet_delay;
    Settings.build_version = rest.build_version;
    Settings.disabledDevtool = rest.disabledDevtool;
    Settings.referral = rest.referral;
  }

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
