import { switchOn } from "./index";

describe("Switcher", () => {


  it("should return the correct case result", () => {
    const result = switchOn(2)
      .case(1, "one")
      .case(2, "two")
      .case(3, "three")
      .eval();

    expect(result).toBe("two");
  });

  it("should return the default case result if no case matches", () => {
    const result = switchOn(4)
      .case(1, "one")
      .case(2, "two")
      .case(3, "three")
      .default("default")
      .eval();

    expect(result).toBe("default");
  });

  it("should handle function case results", () => {
    const result = switchOn(2)
      .case(1, () => "one")
      .case(2, () => "two")
      .eval();

    expect(result).toBe("two");
  });

  it("should handle async function case results", async () => {
    const result = await switchOn(2)
      .case(1, () => "one")
      .case(2, async () => "two")
      .eval();

    expect(result).toBe("two");
  });
});
