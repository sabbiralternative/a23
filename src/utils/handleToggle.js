export const handleToggle = (idx, toggleAccordion, setToggleAccordion) => {
  if (toggleAccordion[idx]) {
    setToggleAccordion((prev) => ({ ...prev, [idx]: false }));
  } else {
    setToggleAccordion((prev) => ({ ...prev, [idx]: true }));
  }
};
