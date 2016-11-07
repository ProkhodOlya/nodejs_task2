import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';

import canonize from './canonize';
import getFullName from './shortfn';

const _DEV_ = true;
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/canonize', function (req, res) {
    // console.log(req.query);
    return res.json({
        url: req.query.url,
        username: canonize(req.query.url),
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Получаем Фамилию инициалы
app.get('/shortfullname', (req, res) => {
    const result = getFullName(req.query.fullname);
    res.send(result);
});

app.get('/qty', (req, res) => {
    let result = '0';
    if (!isNumeric(req.query.a) && !isNumeric(req.query.b)) {
        result = '0';
    } else if (isNumeric(req.query.a) && !isNumeric(req.query.b)) {
        result = req.query.a;
    } else if (!isNumeric(req.query.a) && isNumeric(req.query.b)) {
        result = req.query.b;
    } else if (isNumeric(req.query.a) && isNumeric(req.query.b)) {
        result = String(parseFloat(req.query.a) + parseFloat(req.query.b));
    }
    res.send(result);
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


const BaseUrl ='https://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight'];

//getPokemons - получаем покемонов с конкр.стр.//
async function getPokemons(url, i=0) {
    console.log('getPokemons ', url, i);
    const response = await fetch(url);
    // console.log(response);
    const page = await response.json();
    const pokemons = page.results; //массив ссылка+имя всех первых 20-ти покемонов//
    if (_DEV_ && i > 2) {
        return pokemons;
    }
    //если есть еще стр.с покемонами, то проверяем и добавляем их в массив =еще +20 покемонов//
    if (page.next) {
        const pokemons2 = getPokemons(page.next, i + 1);
        return [
            ...pokemons,
            ...pokemons2,
        ]
    }
    return pokemons;
}
//getPokemon - получаем конкр.покемонова по url//
async function getPokemon(url) {
    console.log ('getPokemon ', url);
    const response = await fetch(url);
    const pokemon = await response.json();
    return pokemon;
}
// console.log (getPokemon(1));
// console.log (getPokemons);

app.get('/', async (req, res) => {
    try {
        const pokemonsUrl = `${BaseUrl}/pokemon`;
        const pokemonsInfo = await getPokemons(pokemonsUrl);
        const pokemonsPromises = pokemonsInfo.map(info => {
                return getPokemon(info.url);
            });

        const pokemonsFull = await Promise.all(pokemonsPromises);
        const pokemons = pokemonsFull.map((pokemon) => {
            return _.pick(pokemon, pokemonFields); //возвращаем покемонские поля//
        });
        const sortPokemons = _.sortBy(pokemons, pokemon => -pokemon.weight); //сортируем от толстых (-) к худым//
        return res.json(sortPokemons);
    }
    catch (err) {
        console.log(err);
        return res.json({ err });
    }
});




// const array = [
//     'https://vk.com/igor.suvorov',
//     'https://twitter.com/suvorovigor5',
//     'https://telegram.me/skillbranch',
//     '@skillbranch',
//     'https://vk.com/skillbranch?w=wall-117903599_1076'
// ];
//
// array.forEach((url) => {
//     const username = canonize(url);
//     console.log(username[5]);
// });

