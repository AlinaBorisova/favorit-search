import { describe, expect, it } from "vitest";
import { buildOfferRows } from "./buildOfferRows";

const warehouse = (overrides = {}) => ({
  id: "w1",
  code: "МС2",
  price: 100,
  stock: 5,
  ...overrides,
});

const good = (overrides = {}) => ({
  goodsID: "g1",
  brand: "MEYLE",
  number: "7160500039/S",
  name: "Рычаги задней подвески",
  price: 999,
  count: 5,
  warehouses: [warehouse()],
  ...overrides,
});

describe("buildOfferRows", () => {
  it("берёт цену со склада, а не из поля price товара", () => {
    const [row] = buildOfferRows([good()]);
    expect(row.price).toBe(100);
  });

  it("делает отдельную строку на каждый склад с уникальными ключами", () => {
    const rows = buildOfferRows([
      good({
        warehouses: [
          warehouse({ id: "w1", price: 100 }),
          warehouse({ id: "w2", price: 120 }),
        ],
      }),
    ]);
    expect(rows).toHaveLength(2);
    expect(new Set(rows.map((r) => r.key)).size).toBe(2);
  });

  it("пропускает склады с нулевым остатком", () => {
    const rows = buildOfferRows([
      good({
        warehouses: [
          warehouse({ id: "w1", stock: 0 }),
          warehouse({ id: "w2", stock: 3 }),
        ],
      }),
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0].stock).toBe(3);
  });

  it("если складов нет, возвращает одну строку «нет в наличии» без цены", () => {
    const [row] = buildOfferRows([good({ warehouses: [] })]);
    expect(row).toMatchObject({ inStock: false, price: null, stock: 0 });
  });

  it("если у всех складов нулевой остаток, тоже возвращает строку «нет в наличии»", () => {
    const rows = buildOfferRows([
      good({
        warehouses: [
          warehouse({ stock: 0 }),
          warehouse({ id: "w2", stock: 0 }),
        ],
      }),
    ]);
    expect(rows).toHaveLength(1);
    expect(rows[0].inStock).toBe(false);
  });

  it("ставит искомую деталь первой, а аналоги после неё", () => {
    const rows = buildOfferRows([
      good({
        analogues: [good({ goodsID: "a1", brand: "Narco", number: "53612/1" })],
      }),
    ]);
    expect(rows.map((r) => [r.goodsID, r.isOriginal])).toEqual([
      ["g1", true],
      ["a1", false],
    ]);
  });

  it("работает, если поля analogues нет", () => {
    expect(buildOfferRows([good()])).toHaveLength(1);
  });

  it("возвращает пустой массив, если данных нет", () => {
    expect(buildOfferRows()).toEqual([]);
    expect(buildOfferRows([])).toEqual([]);
  });

  it("не падает, если у склада нет сокращённого названия", () => {
    const [row] = buildOfferRows([
      good({ warehouses: [warehouse({ code: undefined })] }),
    ]);
    expect(row.warehouse).toBeNull();
  });
});
