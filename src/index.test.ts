import { expect, test } from "vitest";
import { createRouterBuilder } from ".";

test("export default", () => {
  expect(typeof createRouterBuilder).toBe("function");
});
