const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.ARCHIVE_NAME = "heroes.json";
  }

  async getArchiveData() {
    const archive = await readFileAsync(this.ARCHIVE_NAME, "utf8");

    return JSON.parse(archive.toString());
  }

  async writeArchive(data) {
    await writeFileAsync(this.ARCHIVE_NAME, JSON.stringify(data));
    return true;
  }

  async createHeroe(heroe) {
    const data = await this.getArchiveData();
    const id = heroe.id <= 2 ? heroe.id : Date.now();

    const heroeWithId = { id, ...heroe };
    const finalData = [...data, heroeWithId];

    const result = await this.writeArchive(finalData);
    return result;
  }

  async list(id) {
    const data = await this.getArchiveData();
    const filteredData = data.filter((item) => (id ? item.id === id : true));
    return filteredData;
  }

  async remove(id) {
    if (!id) {
      return await this.writeArchive([]);
    }

    const data = await this.getArchiveData();
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      throw Error("User not exist");
    }

    data.splice(index, 1);

    return await this.writeArchive(data);
  }
}

module.exports = new Database();
