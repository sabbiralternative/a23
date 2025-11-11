import "./affiliate.css";
import BonusInformation from "./BonusInformation";
import InviteSection from "./InviteSection";
import TodayProfitLoss from "./TodayProfitLoss";
import TodayStatusSection from "./TodayStatusSection";
import TopFiveLossUser from "./TopFiveLossUser";
const Affiliate = () => {
  return (
    <div className="main-content">
      <div data-v-4c49d924 className="container">
        <TodayStatusSection />
        <InviteSection />
        <TopFiveLossUser />
        <BonusInformation />
        <TodayProfitLoss />
      </div>
    </div>
  );
};

export default Affiliate;
