import { LitElement, html, css } from 'lit-element';

class GtcWcExternalStyle extends LitElement {
  static styles = css`
    .externalList {
      margin: 10px 0 0;
      padding: 0;
      font-size: 14px;
      list-style-type: none;
    }
  `;
}

customElements.define('gtc-wc-external-style', GtcWcExternalStyle)