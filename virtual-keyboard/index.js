import Keyboard from './keyboard.js';

document.querySelector('body').innerHTML = `
    <h1>Virtual keyboard task</h1>
    <p>Designed for MacOS</p>
    <p>Press Alt + Shift - next layout</p>
    <textarea class="input" type="text"/>
  `;
const keybrd = new Keyboard(document.querySelector('body'));

keybrd.input = document.querySelector('.input');
