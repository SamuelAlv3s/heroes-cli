const { program } = require("commander");
const Database = require("./database");
const Heroe = require("./heroe");

async function main() {
  program
    .version("v1")
    .option("-n --name [value]", "Name of Heroe")
    .option("-p --power [value]", "Power of Heroe")
    .option("-i --id [value]", "Id of Heroe")
    .option("-c --create", "Create an heroe")
    .option("-l --list", "List heroe")
    .option("-u --update [value]", "Update an heroe by id")
    .option("-r --remove", "Remove an heroe by id")
    .parse(process.argv);

  const options = program.opts();

  const heroe = new Heroe(options);

  try {
    if (options.create) {
      const result = await Database.createHeroe(heroe);

      if (!result) {
        console.error("Heroe not created");
        return;
      }

      console.log("Heroe created");
    }

    if (options.list) {
      const result = await Database.list();

      console.log(result);
      return;
    }

    if (options.remove) {
      const result = await Database.remove(heroe.id);

      if (!result) {
        console.log("Error on remove heroe");
        return;
      }

      console.log("Heroe removed");
      return;
    }

    if (options.update) {
      const idForUpdate = parseInt(options.id);

      const data = JSON.stringify(heroe);
      const heroeUpdate = JSON.parse(data);

      const result = await Database.update(idForUpdate, heroeUpdate);

      if (!result) {
        console.error("Heroe not updated");
        return;
      }

      console.log("Heroe Updated");

      return;
    }
  } catch (error) {
    console.error(":( ", error);
  }
}

main();
