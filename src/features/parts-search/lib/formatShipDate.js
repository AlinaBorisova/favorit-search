const formatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
});

export function formatShipDate(iso) {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return formatter.format(new Date(year, month - 1, day));
}
