import {LitElement, html, css } from 'lit-element';
import
class GtcWcExternal extends LitElement {
  static styles = css`
    .externalList {
      margin: 10px 0 0;
      padding: 0;
      font-size: 14px;
      list-style-type: none;
    }
  `;

  render() {
    return html `

  <div id="summary">${this._processHtml()}<div>
   `;
  }

  static get properties() {
    return {
      sampleids: Object,
      accession: String
    };
  }

  // </div>
  // <div>
  // sampleids: ${this.sampleids}
  // accession: ${this.accession}
  // accessionhtml: <p>Accession Number:${this._accessionHtml()}</p>
  // ${this._massHtml()}
  // ${this._contributionHtml()}

  constructor() {
    super();
    console.log("constructor");
    this.accession="G06334MO";
    this.sampleids={};
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
    // const url1 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_summary?accNum=' + this.accession;
    // const url2 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_image?accession=' + this.accession + '&style=normalinfo&notation=snfg&format=svg';

    const url1 = 'https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_external_id?accNum=' + this.accession;
    this.getContents(url1);
  }

  getContents(url1) {
    console.log(url1);
    var urls = [];

    urls.push(url1);
    var promises = urls.map(url => fetch(url, {
      mode: 'cors'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      console.log("contents");
      console.log(JSON.stringify(myJson));
      return myJson;
    }));
    Promise.all(promises).then(results => {
      console.log("values");
      console.log(results);

      this.sampleids = results.pop();
      console.log("sampleids");
      console.log(this.sampleids);
      var test = 'GlycomeDB'
      console.log(this.sampleids[test].label);
      console.log(typeof(this.sampleids));
    });
  }

  _processHtml() {
    return html `
    <ul class="externalList">
    ${Object.keys(this.sampleids).map(item => html`
    <li>
      <p class="externalList_heading">${this.sampleids[item].label}</p>
      <ul class="externalList_category">
        ${this.sampleids[item].list.map(item => html`
        <li><a href="${item.url}" target="_blank">${item.id}</a></li>
        `)}
      </ul>
      <div class="source">
        <a class="source_btn">from ${this.sampleids[item].from}</a>
        <div class="source_content">
          <p class="source_text">
            ${this.sampleids[item].description}</br>
            URL: <a href="{{this.partnerurl}}" target="_blank">${this.sampleids[item].partnerurl}</a>
          </p>
        </div>
		  </div>
    </li>
    `)}
    </ul>
    `;
  }
}

customElements.define('gtc-wc-external', GtcWcExternal);
