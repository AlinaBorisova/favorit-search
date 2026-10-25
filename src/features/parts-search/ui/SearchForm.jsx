import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSubmitted } from "../model/searchSlice";

export function SearchForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const number = value.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!number) return;
    dispatch(searchSubmitted(number));
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 mt-4">
      <div className="col-12 col-sm">
        <label htmlFor="part-number" className="visually-hidden">
          Артикул детали
        </label>
        <input
          id="part-number"
          type="search"
          className="form-control py-3"
          placeholder="Введите артикул, например 0189"
          autoComplete="off"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className="col-12 col-sm-auto d-grid d-sm-block">
        <button
          type="submit"
          className="btn btn-primary py-3 px-5"
          disabled={!number}
        >
          Найти
        </button>
      </div>
    </form>
  );
}
