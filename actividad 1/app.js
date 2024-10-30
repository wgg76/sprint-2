const mongoose = require('mongoose');

// Definición del esquema de superhéroes
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-07' }); // Aquí defines la colección de cada grupo

// Modelo de superhéroe
const Superhero = mongoose.model('Superhero', superheroSchema);

// Conexión a la base de datos
mongoose.connect('mongodb+srv://Grupo-07:grupo07@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a la base de datos correctamente');
})
.catch(error => {
    console.error('Error al conectar a la base de datos:', error);
});

// Función para insertar un superhéroe
async function insertSuperHero() {
    const hero = new Superhero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde']
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

// Función para actualizar un superhéroe
async function updateSuperHero(nombreSuperHeroe) {
    const result = await Superhero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualización:', result);
}

// Función para eliminar un superhéroe
async function deleteSuperHero(nombreSuperHeroe) {
    const result = await Superhero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superhéroe eliminado:', result);
}
// Funcion para encontrar supereheroe
async function findSuperHeroes () {
    const heroes = await Superhero.find({ planetaOrigen: 'Tierra' });
    console.log(`Superhéroes encontrados:`, heroes);
}
findSuperHeroes();

// Llamar a las funciones para insertar y actualizar el superhéroe
async function main() {
    await insertSuperHero(); // Primero insertamos el superhéroe
    console.log(insertSuperHero);
    
    await updateSuperHero('Spiderman'); // Luego actualizamos su edad
    console.log(updateSuperHero);
    
    await deleteSuperHero('Spiderman'); // Finalmente, eliminamos al superhéroe
    console.log(deleteSuperHero);

    await findSuperHeroes ('Tierra'); // Finalmente, Buscamos al superhéroe
    console.log(findSuperHeroes);
    
}
