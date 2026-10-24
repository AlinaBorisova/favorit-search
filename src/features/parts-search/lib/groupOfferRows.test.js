import { describe, expect, it } from "vitest";
import { groupOfferRows } from "./groupOfferRows";

const row = (overrides = {}) => ({
  key: "k",
  goodsID: "g1",
  brand: "MEYLE",
  number: "1",
  name: "Деталь",
  isOriginal: true,
  inStock: true,
  ...overrides,
});

describe("groupOfferRows", () => {
  it("собирает строки одной детали в одну группу", () => {
    const groups = groupOfferRows([row({ key: "a" }), row({ key: "b" })]);
    expect(groups).toHaveLength(1);
    expect(groups[0].offers).toHaveLength(2);
  });

  it("ставит искомую деталь первой, аналоги после неё", () => {
    const groups = groupOfferRows([
      row({ key: "a" }),
      row({ key: "b", goodsID: "g2", isOriginal: false }),
    ]);
    expect(groups.map((g) => g.goodsID)).toEqual(["g1", "g2"]);
  });

  it("аналоги в наличии идут раньше аналогов без наличия", () => {
    const groups = groupOfferRows([
      row({ key: "a" }),
      row({ key: "b", goodsID: "g2", isOriginal: false, inStock: false }),
      row({ key: "c", goodsID: "g3", isOriginal: false }),
    ]);
    expect(groups.map((g) => g.goodsID)).toEqual(["g1", "g3", "g2"]);
  });

  it("искомая деталь остаётся первой, даже если её нет в наличии", () => {
    const groups = groupOfferRows([
      row({ key: "a", inStock: false }),
      row({ key: "b", goodsID: "g2", isOriginal: false }),
    ]);
    expect(groups[0].goodsID).toBe("g1");
    expect(groups[0].inStock).toBe(false);
  });

  it("сохраняет порядок API внутри одной категории", () => {
    const groups = groupOfferRows([
      row({ key: "a" }),
      row({ key: "b", goodsID: "g2", isOriginal: false }),
      row({ key: "c", goodsID: "g3", isOriginal: false }),
      row({ key: "d", goodsID: "g4", isOriginal: false }),
    ]);
    expect(groups.map((g) => g.goodsID)).toEqual(["g1", "g2", "g3", "g4"]);
  });

  it("возвращает пустой массив для пустого списка", () => {
    expect(groupOfferRows([])).toEqual([]);
  });
});