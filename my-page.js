import { LitElement, html } from 'lit-element';

class MyPage extends LitElement {
  render() {
    return html `
      ${this.headerTemplate}
    `;
  }
  get headerTemplate() {
    return html`<header>header</header>`;
  }
}

customElements.define('my-page', MyPage);