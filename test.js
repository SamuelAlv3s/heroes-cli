const { deepEqual, ok } = require("assert");

const database = require("./database");

const DEFAULT_ITEM = { name: "Flash", power: "Speed", id: 1 };

describe("Heroes Suite", () => {
  before(async () => {
    await database.createHeroe(DEFAULT_ITEM);
  });

  it("Should be search an heroe, using archives", async () => {
    const expected = DEFAULT_ITEM;
    const [result] = await database.list(expected.id);
    deepEqual(result, expected);
  });

  it("Should be create an heroe, using archives", async () => {
    const expected = DEFAULT_ITEM;
    const result = await database.createHeroe(DEFAULT_ITEM);
    const [actual] = await database.list(DEFAULT_ITEM.id);
    deepEqual(actual, expected);
  });
});
