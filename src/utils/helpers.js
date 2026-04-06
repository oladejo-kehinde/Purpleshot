export const formatCurrency = (num) => "₦" + num.toLocaleString("en-NG");

export const badge = (available) => {
  if (available === 0) return { l: "RENTED OUT", c: "badge-red" };
  if (available === 1) return { l: "LIMITED", c: "badge-amber" };
  return { l: "IN STOCK", c: "badge-green" };
};