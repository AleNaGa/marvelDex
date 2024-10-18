const pubkey = 'fed9e3aace21035c86178331d4905c84';
const pvtkey = '74981438be903a918879ba72ec878a92ec1fa3f5';
const dir = 'gateaway.marvel.com';

let ts = Date.now();
let hash = CryptoJS.MD5(ts+pvtkey+pubkey).toString();

let url = `https://${dir}/v1/public/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}`;


fetch(url)
.then(res => res.json())
.then(data => {
    console.log(data);
})
.catch(err => console.log(err))

