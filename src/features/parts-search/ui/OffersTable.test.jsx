import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OffersTable } from "./OffersTable";

const offer = (overrides = {}) => ({
  key: "o1",
  warehouse: "МСК РС",
  shipmentDate: "2026-10-28T15:30:00+03:00",
  price: 843.6,
  stock: 3,
  inStock: true,
  ...overrides,
});

const group = (overrides = {}) => ({
  goodsID: "g1",
  brand: "CAFFARO",
  number: "01-89",
  name: "Ролик п/клин. ремня",
  isOriginal: true,
  inStock: true,
  offers: [offer()],
  ...overrides,
});

const caption = "Предложения по артикулу 0189";
const renderTable = (groups) =>
  render(<OffersTable groups={groups} caption={caption} />);

describe("OffersTable", () => {
  it("показывает склад, дату отгрузки, цену и остаток", () => {
    renderTable([group()]);
    expect(screen.getByText("МСК РС")).toBeInTheDocument();
    expect(screen.getByText(/28\s+окт/)).toBeInTheDocument();
    expect(screen.getByText(/843,60/)).toBeInTheDocument();
    expect(screen.getByText("3 шт.")).toBeInTheDocument();
  });

  it("помечает плашкой «Искомая» только искомую деталь", () => {
    renderTable([
      group(),
      group({ goodsID: "g2", brand: "Narco", isOriginal: false }),
    ]);
    expect(screen.getAllByText("Искомая")).toHaveLength(1);
  });

  it("позиция без наличия занимает одну строку и без цены", () => {
    renderTable([
      group({
        inStock: false,
        offers: [
          offer({
            key: "o2",
            warehouse: null,
            shipmentDate: null,
            price: null,
            stock: 0,
            inStock: false,
          }),
        ],
      }),
    ]);
    expect(screen.getByText("Нет в наличии")).toBeInTheDocument();
    expect(screen.queryByText(/₽/)).not.toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("если у предложения нет склада или даты, показывает прочерк", () => {
    renderTable([
      group({ offers: [offer({ warehouse: null, shipmentDate: null })] }),
    ]);
    expect(screen.getAllByText("—")).toHaveLength(2);
  });

  it("у таблицы есть доступное имя из подписи", () => {
    renderTable([group()]);
    expect(screen.getByRole("table", { name: caption })).toBeInTheDocument();
  });
});
