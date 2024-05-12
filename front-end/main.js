//@ts-check
import * as cowsay from 'cowsay';

const response = await fetch('http://localhost:3000/');
const loremIpsum = await response.text();
const said = cowsay.say({
  text: loremIpsum,
});

// @ts-ignore
document.querySelector('#app pre').textContent = said;
