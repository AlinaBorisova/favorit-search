import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./getErrorMessage";

describe("getErrorMessage", () => {
  it("возвращает null, если ошибки нет", () => {
    expect(getErrorMessage(undefined)).toBeNull();
  });

  it("переводит известную ошибку API на русский", () => {
    const error = { status: "API_ERROR", message: "Request quota exceeded!" };
    expect(getErrorMessage(error)).toBe(
      "Превышен лимит запросов. Попробуйте позже.",
    );
  });

  it("для неизвестного текста ошибки API возвращает общее сообщение", () => {
    const error = {
      status: "API_ERROR",
      message: "Empty key!, Invalid key client!",
    };
    expect(getErrorMessage(error)).toBe(
      "Сервис вернул ошибку. Попробуйте ещё раз.",
    );
  });

  it("сообщает о проблеме с сетью", () => {
    expect(getErrorMessage({ status: "FETCH_ERROR" })).toBe(
      "Не удалось связаться с сервером. Проверьте подключение к сети.",
    );
  });

  it("для прочих ошибок возвращает запасной текст", () => {
    expect(getErrorMessage({ status: 500 })).toBe(
      "Что-то пошло не так. Попробуйте ещё раз.",
    );
  });
});
