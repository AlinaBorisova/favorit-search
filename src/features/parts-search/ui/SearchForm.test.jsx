import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import searchReducer, { selectNumber } from "../model/searchSlice";
import { SearchForm } from "./SearchForm";

function renderForm() {
  const store = configureStore({ reducer: { search: searchReducer } });
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>,
  );

  return {
    store,
    user,
    input: screen.getByLabelText("Артикул детали"),
    button: screen.getByRole("button", { name: "Найти" }),
  };
}

describe("SearchForm", () => {
  it("кнопка неактивна, пока поле пустое", () => {
    const { button } = renderForm();
    expect(button).toBeDisabled();
  });

  it("кнопка неактивна, если введены одни пробелы", async () => {
    const { user, input, button } = renderForm();
    await user.type(input, "   ");
    expect(button).toBeDisabled();
  });

  it("кнопка активна, когда введён артикул", async () => {
    const { user, input, button } = renderForm();
    await user.type(input, "0189");
    expect(button).toBeEnabled();
  });

  it("отправляет артикул в стор по клику на кнопку", async () => {
    const { store, user, input, button } = renderForm();
    await user.type(input, "0189");
    await user.click(button);
    expect(selectNumber(store.getState())).toBe("0189");
  });

  it("отправляет артикул по Enter", async () => {
    const { store, user, input } = renderForm();
    await user.type(input, "0189{Enter}");
    expect(selectNumber(store.getState())).toBe("0189");
  });

  it("обрезает пробелы по краям артикула", async () => {
    const { store, user, input, button } = renderForm();
    await user.type(input, "  0189  ");
    await user.click(button);
    expect(selectNumber(store.getState())).toBe("0189");
  });

  it("не отправляет пустой поиск по Enter", async () => {
    const { store, user, input } = renderForm();
    await user.type(input, "{Enter}");
    expect(selectNumber(store.getState())).toBe("");
  });
});
