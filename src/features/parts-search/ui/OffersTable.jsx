import { formatPrice } from "../lib/formatPrice";
import { formatShipDate } from "../lib/formatShipDate";
import styles from "./OffersTable.module.css";

export function OffersTable({ groups, caption }) {
  return (
    <div className="table-responsive">
      <table className={`table align-middle mb-0 ${styles.offers}`}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Склад</th>
            <th scope="col">Отгрузка</th>
            <th scope="col" className="text-end">
              Цена
            </th>
            <th scope="col" className="text-end">
              Остаток
            </th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.goodsID}>
            <tr className="table-light">
              <th scope="colgroup" colSpan={4} className="fw-normal">
                <span className="fw-semibold">{group.brand}</span>
                {group.isOriginal && (
                  <span className="badge text-bg-primary ms-2">Искомая</span>
                )}
                <span className="d-block small text-body-secondary">
                  {group.number} · {group.name}
                </span>
              </th>
            </tr>
            {group.offers.map((offer) =>
              offer.inStock ? (
                <tr key={offer.key}>
                  <td>{offer.warehouse ?? "—"}</td>
                  <td>
                    {offer.shipmentDate
                      ? formatShipDate(offer.shipmentDate)
                      : "—"}
                  </td>
                  <td className="text-end text-nowrap">
                    {formatPrice(offer.price)}
                  </td>
                  <td className="text-end text-nowrap">{offer.stock} шт.</td>
                </tr>
              ) : (
                <tr key={offer.key} className="text-body-secondary">
                  <td colSpan={4}>Нет в наличии</td>
                </tr>
              ),
            )}
          </tbody>
        ))}
      </table>
    </div>
  );
}
