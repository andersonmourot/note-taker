const utility = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const writeAsync = utility.promisify(fs.writeFile);
const readAsync = utility.promisify(fs.readFile);

class Store {
  writeFile(note) {
    return writeAsync("db/db.json", JSON.stringify(note));
  }
  readFile() {
    return readAsync("db/db.json", "utf-8");
  }
  get() {
    return this.readFile().then((notes) => {
      let parsed;
      try {
        parsed = [].concat(JSON.parse(notes));
      } catch (err) {
        parsed = [];
      }
      return parsed;
    });
  }
  remove(id) {
    return this.get()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filtered) => this.writeFile(filtered));
  }
  add(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Must input title and text");
    }

    const newNote = { title, text, id: uuidv1() };
    return this.get()
      .then((notes) => [...notes, newNote])
      .then((updated) => this.writeFile(updated))
      .then(() => newNote);
  }
}

module.exports = new Store();
