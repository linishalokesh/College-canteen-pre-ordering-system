export const orders = [];

let nextOrderNumber = 2047;

export const generateOrderId = () => {
  const orderId = `CN${nextOrderNumber}`;
  nextOrderNumber += 1;
  return orderId;
};