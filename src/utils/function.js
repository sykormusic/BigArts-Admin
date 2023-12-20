export const renderMoney = (value) => {
  if (value !== 0) {
    if (!value) return 0;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
