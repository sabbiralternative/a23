import { Fragment, useState } from "react";
import "./affiliate.css";
import BonusInformation from "./BonusInformation";
import InviteSection from "./InviteSection";
import TodayProfitLoss from "./TodayProfitLoss";
import TodayStatusSection from "./TodayStatusSection";
// import TopFiveLossUser from "./TopFiveLossUser";
import Reports from "./Reports";
import Footer from "./Footer";
import ProfitLoss from "./ProfitLoss";
import UserList from "./UserList";
const Affiliate = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="main-content" style={{ margin: "0px 10px" }}>
      <Footer setTab={setTab} tab={tab} />
      <div data-v-4c49d924 className="container">
        {tab === "dashboard" && (
          <Fragment>
            <TodayStatusSection />
            <InviteSection />
            {/* <TopFiveLossUser /> */}
            <BonusInformation />
            <TodayProfitLoss />
          </Fragment>
        )}
        {tab === "user-list" && <UserList />}
        {tab === "pnl" && <ProfitLoss />}
        {tab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default Affiliate;
