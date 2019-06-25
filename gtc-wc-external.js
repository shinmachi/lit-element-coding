import {LitElement, html} from 'lit-element';

class GtcWcExternal extends LitElement {
  static get properties() {
    return {
      sampleids: Array,
      accession: String
    };
  }

  render() {
    return html `
<style>
  padding: 10px; margin-bottom: 10px; border: 1px solid #333333;
</style>
  <div id="summary">${this._processHtml()}<div>
   `;
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
    this.accession="G54245YQ";
    this.image="";
    this.sampleids=[];
    this.mass=null;
    this.contributionTime=null;
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
    });
  }

  _processHtml() {
    return html `
    <ul class="externalList">
      ${this.sampleids.map(data => html`
        <li>
      		<p class="externalList_heading">${data}</p>
      		<ul class="externalList_category"></ul>
        </li>
      `)}
    </ul>
    `;
  }
}

customElements.define('gtc-wc-external', GtcWcExternal);
