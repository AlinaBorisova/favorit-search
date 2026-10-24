function toRows(item, isOriginal) {
  const available = (item.warehouses ?? []).filter((w) => w.stock > 0);

  const base = {
    goodsID: item.goodsID,
    brand: item.brand,
    number: item.number,
    name: item.name,
    isOriginal,
  };

  if (available.length === 0) {
    return [
      {
        ...base,
        key: `${item.goodsID}-none`,
        warehouse: null,
        price: null,
        stock: 0,
        inStock: false,
      },
    ];
  }

  return available.map((w) => ({
    ...base,
    key: `${item.goodsID}-${w.id}`,
    warehouse: w.code ?? null,
    shipmentDate: w.shipmentDate ?? null,
    price: w.price,
    stock: w.stock,
    inStock: true,
  }));
}

export function buildOfferRows(goods = []) {
  return goods.flatMap((good) => [
    ...toRows(good, true),
    ...(good.analogues ?? []).flatMap((analogue) => toRows(analogue, false)),
  ]);
}
