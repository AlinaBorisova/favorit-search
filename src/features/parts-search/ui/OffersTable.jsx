import { formatPrice } from "../lib/formatPrice";
import { formatShipDate } from "../lib/formatShipDate";
import styles from "./OffersTable.module.css";

function PartInfo({ group }) {
  return (
    <>
      <span className="fw-semibold">{group.brand}</span>
      {group.isOriginal && (
        <span className="badge text-bg-primary ms-2">Искомая</span>
      )}
      <span className="d-block small text-body-secondary">
        {group.number} · {group.name}
      </span>
    </>
  );
}

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
        {groups.map((group) =>
          group.inStock ? (
            <tbody key={group.goodsID}>
              <tr className="table-light">
                <th scope="colgroup" colSpan={4} className="fw-normal">
                  <PartInfo group={group} />
                </th>
              </tr>
              {group.offers.map((offer) => (
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
              ))}
            </tbody>
          ) : (
            <tbody key={group.goodsID}>
              <tr className="text-body-secondary">
                <th scope="row" colSpan={3} className="fw-normal">
                  <PartInfo group={group} />
                </th>
                <td className="text-end text-nowrap">Нет в наличии</td>
              </tr>
            </tbody>
          ),
        )}
      </table>
    </div>
  );
}
