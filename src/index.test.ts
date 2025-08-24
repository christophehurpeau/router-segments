import { expect, test } from "vitest";
import { createRouterBuilder } from "./index.ts";

test("export default", () => {
  expect(typeof createRouterBuilder).toBe("function");
});
