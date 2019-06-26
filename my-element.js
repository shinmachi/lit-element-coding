import { LitElement, html, css } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      myString: { type: String },
      myArray: { type: Array },
      myBool: { type: Boolean },
      myInt: { type: Number }
    };
  }
  static get styles() {
    return css`
      p {
        font-family: Roboto;
        font-size: 16px;
        font-weight: 500;
      }
      .red {
        color: red;
      }
      .blue {
        color: blue;
      }
    `;
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
     <p class="${this.myBool ? 'red' : 'blue' }">styled paragraph</p>
     <button @click="${this.clickHandler}">Click</button>
    `;
  }

  clickHandler(event) {
    console.log(event.target);
    this.myBool = !this.myBool;
  }
}

customElements.define('my-element', MyElement);