import { LitElement, html } from 'lit-element';

class LightDom extends LitElement {
  render() {
    return html `
      <p><b>Render root overridden.</b> Template renders in light DOM.</p>
    `;
  }
  createRenderRoot(){
    return this;
  }
}

customElements.define('light-dom', LightDom);