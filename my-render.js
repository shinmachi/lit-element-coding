import { LitElement, html } from 'lit-element';

class MyRender extends LitElement {
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('my-render', MyRender);