import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render(){
    return html`
      <p>A paragraph</p>
    `;
  }
}

customElements.define('my-element', MyElement);