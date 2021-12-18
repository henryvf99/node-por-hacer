const fs = require('fs');
const { writeFile } = require('fs/promises');

let listadoPorHacer = [];

let guardardb = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo crear', err);
    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardardb();
    return porHacer;
}

const listar = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardardb();
        return true;
    } else {
        return false;
    }
}

const eliminar = (descripcion) => {
    cargarDB();
    let nuevaLista = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    if (listadoPorHacer === nuevaLista) {
        return false;
    } else {
        listadoPorHacer = nuevaLista;
        guardardb();
        return true;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}