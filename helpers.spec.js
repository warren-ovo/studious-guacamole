const { specialSubRoutine } = require("./helpers");

const logger = require("./logger");
jest.mock("./logger", () => {
  return { info: jest.fn(), error: jest.fn() };
});

describe("special routine", () => {
  it("should do logging", () => {
    specialSubRoutine();
    expect(logger.info).toBeCalledTimes(1);
  });
});
