const utility = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');
const writeAsync = utility.promisify(fs.writeFile);
const readAsync = utility.promisify(fs.readFile);

class Store {
    writeFile (note) {
        return writeAsync('db/db.json', JSON.stringify(note));
    }
    readFile() {
        return readAsync('db/db.json', 'utf-8');
    }
    add(note) {
        const {title, text} = note;
        if(!title || !text) {
            throw new Error('Must input title and text');
        }

        const newNote = {title,text,id: uuid()};
        return this.get()
            .then((notes) => [...notes, newNote])
            .then((updated) => this.write(updated))
            .then(() => newNote);
    }
}