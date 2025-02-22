export const handleDownLineId = (setModal, downLineId, setDownLineId) => {
  setModal((prev) => !prev);
  setDownLineId("");
  setDownLineId(downLineId);
};
