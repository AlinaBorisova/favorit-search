import { describe, expect, it } from "vitest";
import { groupOfferRows } from "./groupOfferRows";

const row = (overrides = {}) => ({
  key: "k",
  goodsID: "g1",
  brand: "MEYLE",
  number: "1",
  name: "Деталь",
  isOriginal: true,
  ...overrides,
});

describe("groupOfferRows", () => {
  it("собирает строки одной детали в одну группу", () => {
    const groups = groupOfferRows([row({ key: "a" }), row({ key: "b" })]);
    expect(groups).toHaveLength(1);
    expect(groups[0].offers).toHaveLength(2);
  });

  it("сохраняет порядок: искомая деталь, потом аналоги", () => {
    const groups = groupOfferRows([
      row({ key: "a" }),
      row({ key: "b", goodsID: "g2", isOriginal: false }),
    ]);
    expect(groups.map((g) => g.goodsID)).toEqual(["g1", "g2"]);
  });

  it("возвращает пустой массив для пустого списка", () => {
    expect(groupOfferRows([])).toEqual([]);
  });
});
