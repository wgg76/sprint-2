import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        try {
            const superHero = await SuperHero.findOne({ id: Number(id) });
            
            if (!superHero) {
                console.log('Superhéroe no encontrado.');
                return { message: 'Superhéroe no encontrado' };
            }
            
            return superHero;
        } catch (error) {
            console.error('Error al obtener el superhéroe por ID:', error);
            throw new Error('Error al obtener el superhéroe');
        }
    }

    obtenerTodos() {
        try {
            return SuperHero.find({});
        } catch (error) {
            console.error('Error al obtener todos los superhéroes:', error);
            throw new Error('Error al obtener los superhéroes');
        }
    }

    buscarPorAtributo(atributo, valor) {
        try {
            let query;
            
            // Verifica si el valor es un número o una cadena
            if (!isNaN(valor)) {
                // Si es un número, realiza una búsqueda exacta
                query = { [atributo]: Number(valor) };
            } else {
                // Si es una cadena, aplica una expresión regular para búsqueda insensible a mayúsculas
                query = { [atributo]: new RegExp(valor, 'i') };
            }
            
            return SuperHero.find(query);
        } catch (error) {
            console.error('Error al buscar superhéroes por atributo:', error);
            throw new Error('Error en la búsqueda de superhéroes');
        }
    }

    obtenerMayoresDe30() {
        try {
            return SuperHero.find({ edad: { $gt: 30 }, planetaOrigen: 'Tierra', poderes: { $size: { $gte: 2 } } });
        } catch (error) {
            console.error('Error al obtener superhéroes mayores de 30:', error);
            throw new Error('Error al obtener superhéroes mayores de 30');
        }
    }
}

export default new SuperHeroRepository();
