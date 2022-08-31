const { deepEqual, ok } = require("assert");

const database = require("./database");

const DEFAULT_ITEM = { name: "Flash", power: "Speed", id: 1 };
const DEFAULT_ITEM_UPDATED = { name: "Super Man", power: "Force", id: 2 };

describe("Heroes Suite", () => {
  before(async () => {
    await database.createHeroe(DEFAULT_ITEM);
  });

  it("Should search an heroe, using archives", async () => {
    const expected = DEFAULT_ITEM;
    const [result] = await database.list(expected.id);
    deepEqual(result, expected);
  });

  it("Should create an heroe, using archives", async () => {
    const expected = DEFAULT_ITEM;
    const result = await database.createHeroe(DEFAULT_ITEM);
    const [actual] = await database.list(DEFAULT_ITEM.id);
    deepEqual(actual, expected);
  });

  it("Should remove an heroe by id", async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_ITEM.id);
    deepEqual(result, expected);
  });

  it("Should update an heroe by id", async () => {
    const expected = { ...DEFAULT_ITEM_UPDATED, power: "Super Force" };

    const newData = {
      power: "Super Force",
    };

    await database.update(DEFAULT_ITEM_UPDATED.id, newData);
    const [result] = await database.list(expected.id);

    deepEqual(result, expected);
  });
});
