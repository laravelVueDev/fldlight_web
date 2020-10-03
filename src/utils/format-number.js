export function formatNumber(number, style = "percent") {
  if (!isNaN(number)) {
    return new Intl.NumberFormat("en-US", {
      style: style,
      maximumFractionDigits: 2
    }).format(number);
  } else {
    return;
  }
}
