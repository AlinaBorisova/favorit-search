export function groupOfferRows(rows) {
  const groups = [];
  const byId = new Map();

  for (const row of rows) {
    let group = byId.get(row.goodsID);
    if (!group) {
      group = {
        goodsID: row.goodsID,
        brand: row.brand,
        number: row.number,
        name: row.name,
        isOriginal: row.isOriginal,
        offers: [],
      };
      byId.set(row.goodsID, group);
      groups.push(group);
    }
    group.offers.push(row);
  }

  for (const group of groups) {
    group.inStock = group.offers.some((offer) => offer.inStock);
  }

  const rank = (group) => (group.isOriginal ? 0 : group.inStock ? 1 : 2);
  return groups.sort((a, b) => rank(a) - rank(b));
}
