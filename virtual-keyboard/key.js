class Key {
  mainSymbol;

  shiftSymbol;

  /**
   * {
    key: "?",
    code: "Slash",
    altKey: false,
    shiftKey: true,
    keyCode: 191,
  },
   */
  constructor(key) {
    this.el = document.createElement('div');
    this.el.innerHTML = `
        <span class="keyContent">${key.key}</span>
    `;
    this.el.classList.add('key');
    this.el.id = key.code;
  }
}

export default Key;
