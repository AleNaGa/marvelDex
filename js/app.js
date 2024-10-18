import config from "../config.js";
let ts = Date.now();
//Obtiene las claves
const pubkey = config.PUBKEY_MARVEL;
const pvtkey = config.PRIVKEY_MARVEL;
let hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

//Cadena de consulta a la api
let call = `ts=${ts}&apikey=${pubkey}&hash=${hash}`;

let urlPjs = `https://gateway.marvel.com/v1/public/characters?${call}`;

let urlComic = `https://gateway.marvel.com/v1/public/comics?${call}`;


//FUNCION ASYNC
async function fetchMarvelAsync(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    let personajes = data.data.results;
    renderMarvel(personajes);
}

// FUNCION FETCH
function fetchMarvel(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let array = data.data.results;
        renderMarvel(array);
    })
    .catch(error => console.error(error));
}

//FUNCION DE RENDER
function renderMarvel(array){
    
    for (let i = 0; i < array.length; i++) {
        const person = array[i];
        const name = person.name;
        const image = person.thumbnail.path + '.' + person.thumbnail.extension;
        const description = person.description;

        const card = document.querySelector('.card');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        img.src = image;
        h3.textContent = name;
        p.textContent = description;

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(p);
        }
}

 fetchMarvel(urlComic);
 fetchMarvelAsync(urlPjs);


