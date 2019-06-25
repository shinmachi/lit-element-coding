import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      myString: { type: String },
      myArray: { type: Array },
      myBool: { type: Boolean },
      myInt: { type: Number }
    };
  }
  constructor() {
    super();
    this.myString = 'Hello World';
    this.myArray = ['an', 'array', 'of', 'test', 'data'];
    this.myBool = true;
    this.myInt = 10;
  }
  render(){
    return html`
      <p>${this.myString}</p>
      <ul>
        ${this.myArray.map(i => html`<li>${i}</li>` )}
      </ul>
      ${this.myBool?
        html `<p>Render some HTML if myBool is true`:
        html `<p>Render some other HTML if myBool is fales</p>`
      }
     ${(this.myInt == 11)?
              html `<p>Render some HTML if myInt is 10`:
        html `<p>Render some other HTML if myInt is other than 10</p>`
     }
     <div>Hello World</div>
    `;
  }
    firstUpdated(changedProperties) {
    let event = new CustomEvent('my-event', {
      detail: {
        message: 'Something important happened'
      }
    });
    this.dispatchEvent(event);
  }
}

customElements.define('my-element', MyElement);