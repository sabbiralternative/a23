import { API } from "../../api";
import LiveSlotWolf from "../../components/ui/LiveSlotWolf/LiveSlotWolf";

const Slots = () => {
  return (
    <>
      <LiveSlotWolf api={API.slotsWolf} />
    </>
  );
};

export default Slots;
