import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert, Loader } from "@/shared/ui";
import { useGetBrandsQuery } from "../api/partsApi";
import { getErrorMessage } from "../lib/getErrorMessage";
import { brandSelected, selectBrand, selectNumber } from "../model/searchSlice";

export function BrandList() {
  const dispatch = useDispatch();
  const number = useSelector(selectNumber);
  const selectedBrand = useSelector(selectBrand);

  const { currentData, isFetching, error } = useGetBrandsQuery(number, {
    skip: !number,
  });

  if (!number) return null;
  if (isFetching) return <Loader label="Ищем производителей…" />;
  if (error) return <ErrorAlert message={getErrorMessage(error)} />;
  if (!currentData?.length) {
    return (
      <p className="text-muted">По артикулу «{number}» ничего не найдено.</p>
    );
  }

  return (
    <section>
      <h2 className="h5 mb-3">Выберите производителя</h2>
      <div className="list-group">
        {currentData.map((item) => {
          const isSelected = item.brand === selectedBrand;
          return (
            <button
              key={item.goodsID}
              type="button"
              className={`list-group-item list-group-item-action${isSelected ? " active" : ""}`}
              aria-pressed={isSelected}
              onClick={() => dispatch(brandSelected(item.brand))}
            >
              <span className="fw-semibold">{item.brand}</span>
              <span className="d-block small">{item.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
