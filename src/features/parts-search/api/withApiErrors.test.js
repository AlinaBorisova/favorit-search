import { describe, expect, it, vi } from "vitest";
import { withApiErrors } from "./withApiErrors";

const run = (result) =>
  withApiErrors(vi.fn().mockResolvedValue(result))("", {}, {});

describe("withApiErrors", () => {
  it("пропускает успешный ответ без изменений", async () => {
    const ok = { data: { goods: [] } };
    expect(await run(ok)).toBe(ok);
  });

  it("превращает ошибку из ответа 200 в API_ERROR", async () => {
    const result = await run({ data: { error: "Empty number goods!" } });
    expect(result).toEqual({
      error: { status: "API_ERROR", message: "Empty number goods!" },
    });
  });

  it("превращает ошибку из ответа 403 в API_ERROR", async () => {
    const result = await run({
      error: { status: 403, data: { error: "Request quota exceeded!" } },
    });
    expect(result.error).toEqual({
      status: "API_ERROR",
      message: "Request quota exceeded!",
    });
  });

  it("склеивает несколько ошибок через запятую", async () => {
    const result = await run({
      data: { error: ["Empty key!", "Invalid key client!"] },
    });
    expect(result.error.message).toBe("Empty key!, Invalid key client!");
  });

  it("не трогает сетевые ошибки", async () => {
    const networkError = { error: { status: "FETCH_ERROR", error: "fail" } };
    expect(await run(networkError)).toBe(networkError);
  });
});
