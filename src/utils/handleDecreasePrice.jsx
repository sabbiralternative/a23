export const handleDecreasePrice = (price, placeBetValues, setPrice) => {
  if (price < 1.02 || placeBetValues?.isWeak === true) {
    return;
  } else if (price < 2) {
    setPrice((parseFloat(price) - 0.01).toFixed(2));
  } else if (price > 1.99 && price < 3) {
    setPrice((parseFloat(price) - 0.02).toFixed(2));
  } else if (price > 2.99 && price < 4) {
    setPrice((parseFloat(price) - 0.05).toFixed(2));
  } else if (price > 3.99 && price < 6) {
    setPrice((parseFloat(price) - 0.1).toFixed(1));
  } else if (price > 5.99 && price < 10) {
    setPrice((parseFloat(price) - 0.2).toFixed(1));
  } else if (price > 9.99 && price < 20) {
    setPrice((parseFloat(price) - 0.5).toFixed(1));
  } else {
    setPrice(parseFloat(price) - 1);
  }
};
