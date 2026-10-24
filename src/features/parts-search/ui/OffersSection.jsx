import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ErrorAlert, Loader } from "@/shared/ui";
import { useGetAnaloguesQuery } from "../api/partsApi";
import { buildOfferRows } from "../lib/buildOfferRows";
import { getErrorMessage } from "../lib/getErrorMessage";
import { selectBrand, selectNumber } from "../model/searchSlice";
import { OffersTable } from "./OffersTable";
import { groupOfferRows } from "../lib/groupOfferRows";

export function OffersSection() {
  const number = useSelector(selectNumber);
  const brand = useSelector(selectBrand);

  const { currentData, isFetching, error } = useGetAnaloguesQuery(
    { number, brand },
    { skip: !number || !brand },
  );

  const groups = useMemo(
    () => groupOfferRows(buildOfferRows(currentData)),
    [currentData],
  );

  if (!number || !brand) return null;
  if (isFetching) return <Loader label="Загружаем предложения…" />;
  if (error) return <ErrorAlert message={getErrorMessage(error)} />;
  if (groups.length === 0) {
    return <p className="text-muted">Предложений не найдено.</p>;
  }

  return (
    <section className="card overflow-hidden">
      <h2 className="card-header h5 mb-0">Аналоги и предложения</h2>
      <OffersTable
        groups={groups}
        caption={`Аналоги и предложения по артикулу ${number}, производитель ${brand}`}
      />
    </section>
  );
}
