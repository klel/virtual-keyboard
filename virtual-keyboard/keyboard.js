import Key from './key.js';
import enKeysSet from './en_key_generator.js';
import ruKeysSet from './ru_key_generator.js';

// import { style } from "style.css";

class Keyboard {
  input;
  currentLayout = 'en';

  constructor(target) {
    this.target = target;
    this.el = document.createElement('div');
    this.init();
  }

  init() {
    this.target.append(this.el);
    this.el.classList.add('container');
    this.loadLayout();
    this.setLayout('en');

    window.addEventListener('keydown', (e) => {
      //   debugger;
      if (e.repeat) {
        return;
      }
      this.input.focus();
      if (e.shiftKey) {
        this.setKeyContent(false);
      }
      if (e.code === 'Tab') {
        e.preventDefault();
        this.input.value += '    ';
      }

      if (e.altKey && e.shiftKey) {
        document.querySelector('#lang').click();
      }
      this.setKeyStyle(e);
    });

    window.addEventListener('keyup', (e) => {
      if (!e.shiftKey) {
        this.setKeyContent(true);
      }

      this.setKeyStyle(e);
    });

    window.addEventListener('keypress', (e) => {
      //this.input.value += e.key;
    });

    this.el.addEventListener('mousedown', (e) => {
      //   debugger;
      if (!e.target.classList.contains('key')) {
        let letter = e.target.innerHTML;
        if (letter.length === 1) {
          this.input.value += e.target.innerHTML;
        }
        e.target.parentElement.classList.toggle('key--pressed');
        return;
      }

      let letter = e.target.children[0].innerHTML;
      if (letter.length === 1) {
        this.input.value += e.target.children[0].innerHTML;
      }
      //   debugger;
      //   window.dispatchEvent(
      //     new KeyboardEvent('keydown', {
      //       code: e.target.id,
      //       key: e.target.children[0].innerHTML,
      //     })
      //   );

      //   this.input.value += e.target.dataset?.noShift;
      e.target.classList.toggle('key--pressed');
    });

    this.el.addEventListener('mouseup', (e) => {
      if (!e.target.classList.contains('key')) {
        e.target.parentElement.classList.toggle('key--pressed');
        return;
      }
      e.target.classList.remove('key--pressed');
    });
  }

  setLayout() {
    if (this.currentLayout === 'ru') {
      enKeysSet.forEach((data) => {
        let key = new Key(data);

        key.el.dataset.shift = data.keyShift;
        key.el.dataset.noShift = data.key;
        this.el.append(key.el);
      });

      this.currentLayout = 'en';
    } else {
      ruKeysSet.forEach((data) => {
        let key = new Key(data);

        key.el.dataset.shift = data.keyShift;
        key.el.dataset.noShift = data.key;
        this.el.append(key.el);
      });
      this.currentLayout = 'ru';
    }

    this.appendLangButton();
    //this.saveLayout();
  }

  appendLangButton() {
    let box = document.createElement('div');
    box.classList.add('lang-button');
    let checked = this.currentLayout === 'ru' ? 'checked' : '';
    let pic = this.currentLayout === 'ru' ? '🇷🇺' : '🇬🇧';

    box.innerHTML = `
    <input id="lang" type="checkbox" ${checked} />
    <label class="lang-label" for="lang">${pic}</label>
      `;

    document.querySelector('.container').append(box);

    document.querySelector('#lang').addEventListener('change', (e) => {
      let c = document.querySelector('.container');
      //   this.clearContainer();
      c.innerHTML = '';

      this.saveLayout();
      this.setLayout();
    });
  }

  //   clearContainer() {
  //     document.querySelectorAll('.key').forEach((e) => {
  //       e.remove();
  //     });

  setKeyStyle(e) {
    let key = document.querySelector(`#${e.code}`);
    if (!key) {
      return;
    }
    key.classList.toggle('key--pressed');
  }

  setKeyContent(shiftPressed) {
    document.querySelectorAll('.key').forEach((e) => {
      let content = shiftPressed ? e.dataset.noShift : e.dataset.shift;
      e.innerHTML = `
                <span class="keyContent">${content}</span>
            `;
    });
  }

  saveLayout() {
    localStorage.setItem('keyboard-lt', this.currentLayout);
  }

  loadLayout() {
    this.currentLayout = localStorage.getItem('keyboard-lt');
  }
}

// customElements.define("kbrd", Keyboard);

export default Keyboard;
