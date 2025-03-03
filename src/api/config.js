import axios from "axios";
import { API, Settings } from "./index";

export const getSetApis = (setNoticeLoaded, baseUrl) => {
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";

  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      if (data?.result?.endpoint) {
        API.groupSportsBook = data?.result?.endpoint?.groupSportsBook;
        API.index = data?.result?.endpoint?.index;
        API.utr = data?.result?.endpoint?.utr;
        API.language = data?.result?.endpoint?.language;
        API.bonus = data?.result?.endpoint?.bonus;
        API.banner = data?.result?.endpoint?.banner;
        API.mac88 = data?.result?.endpoint?.mac88;
        API.eventDetails = data?.result?.endpoint?.eventDetails;
        API.login = data?.result?.endpoint?.login;
        API.bankAccount = data?.result?.endpoint?.bankAccount;
        API.balance = data?.result?.endpoint?.balance;
        API.otp = data?.result?.endpoint?.otp;
        API.whatsApp = data?.result?.endpoint?.whatsapp;
        API.register = data?.result?.endpoint?.register;
        API.uploadScreenshot = data?.result?.endpoint?.uploadScreenshot;
        API.buttonValue = data?.result?.endpoint?.buttonValue;
        API.changePassword = data?.result?.endpoint?.changePassword;
        API.liveCasinoIFrame = data?.result?.endpoint?.liveCasinoIFrame;
        API.exposure = data?.result?.endpoint?.exposure;
        API.currentBets = data?.result?.endpoint?.currentBets;
        API.order = data?.result?.endpoint?.order;
        API.accountStatement = data?.result?.endpoint?.accountStatement;
        API.settledBets = data?.result?.endpoint?.settledBets;
        API.indiaCardGames = data?.result?.endpoint?.indiaCardGames;
        API.assets = data?.result?.endpoint?.assets;
        API.internationalCasino = data?.result?.endpoint?.internationalCasino;
        API.slots = data?.result?.endpoint?.slots;
        API.homeCasino = data?.result?.endpoint?.homeCasino;
        API.depositBreakdown = data?.result?.endpoint?.depositBreakdown;
        API.withdrawBreakdown = data?.result?.endpoint?.withdrawBreakdown;
        API.notification = data?.result?.endpoint?.notification;
        API.accessToken = data?.result?.endpoint?.accessToken;
        API.ladder = data?.result?.endpoint?.ladder;
        API.forgotPassword = data?.result?.endpoint?.forgotPassword;
        API.siteSettings = data?.result?.endpoint?.siteSettings;
        API.pg = data?.result?.endpoint?.pg;
        API.pgStatus = data?.result?.endpoint?.pgStatus;
        API.otpless = data?.result?.endpoint?.otpless;
        API.casinoGames = data?.result?.endpoint?.casinoGames;
        API.liveCasinoWolf = data?.result?.endpoint?.liveCasinoWolf;
        API.slotsWolf = data?.result?.endpoint?.slotsWolf;
        API.bonusClaim = data?.result?.endpoint?.bonusClaim;
        API.royalCasino = data?.result?.endpoint?.royalCasino;
        Settings.siteUrl = data?.result?.settings?.siteUrl;
        Settings.interval = data?.result?.settings?.interval;
        Settings.siteTitle = data?.result?.settings?.siteTitle;
        Settings.referral = data?.result?.settings.referral;
        Settings.balanceApiLoop = data?.result?.settings?.balanceApiLoop;
        Settings.register = data?.result?.settings?.registration;
        Settings.mac88 = data?.result?.settings?.mac88;
        Settings.otp = data?.result?.settings?.otp;
        Settings.disabledDevtool = data?.result?.settings?.disabledDevtool;
        Settings.casinoCurrency = data?.result?.settings?.casinoCurrency;
        Settings.apkLink = data?.result?.settings?.apkLink;
        Settings.chaportAppId = data?.result?.settings?.chaportAppId;
        Settings.otpless = data?.result?.settings?.otpless;
        Settings.paymentIntent = data?.result?.settings?.paymentIntent;
        Settings.betFairCashOut = data?.result?.settings?.betFairCashOut;
        Settings.baseUrl = data?.result?.settings?.baseUrl;
        Settings.build = data?.result?.settings?.build;
        Settings.logoFormat = data?.result?.logo?.format;
        Settings.logoHeight = data?.result?.logo?.height;
        Settings.logoWidth = data?.result?.logo?.width;
        Settings.b2c = data?.result?.settings?.b2c;
        Settings.language = data?.result?.settings?.language;
        Settings.bookmakerCashOut = data?.result?.settings?.bookmakerCashOut;
        Settings.betDelay = data?.result?.settings?.betDelay;

        setNoticeLoaded(true);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
