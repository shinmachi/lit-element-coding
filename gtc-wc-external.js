import {LitElement, html, css } from 'lit-element';

class GtcWcExternal extends LitElement {
  static get properties() {
    return {
      sampleids: Object,
      accession: String
    };
  }

  static styles = css`
    main {
      border: 0;
      border-radius: 0;
      box-shadow: none;
      overflow: hidden;
    }

    .externalList {
      margin: 10px 0 0;
      padding: 0;
      font-size: 14px;
      list-style-type: none;
    }

    .externalList > li.stanzaNothingFound {
      width: 100%;
      float: none;
      margin: 0 0 10px;
      padding: 5px 0;
      background: #EEE;
      color: #999;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }

    .externalList > li:before, .externalList > li:after {
      content: " ";
      display: table;
    }

    .externalList > li:after {
      clear: both;
    }

    .externalList > li + li {
      margin: 20px 0 0;
      padding: 0;
    }

    .externalList_heading {
      width: 20%;
      margin: 0;
      padding: 0;
      float: left;
    }

    .externalList_category {
      width: 80%;
      margin: 0;
      float: left;
      list-style-type: disc;
    }

    .externalList_category:before, .externalList_category:after {
      content: " ";
      display: table;
    }

    .externalList_category:after {
      clear: both;
    }

    .externalList_category > li {
      min-width: 100px;
      margin: 0 15px 0 0;
      float: left;
      line-height: 2;
    }

    .externalList_category > li > a {
      color: #09D;
      text-decoration: underline;
    }


    /* Partner Explanation */
    .source {
      margin: 15px 0 0;
      padding: 0;
      text-align: right;
      font-size: 14px;
    }

    .source_content {
      display: none;
      margin: 5px 0 10px;
      padding: 20px;
      background: #FFC;
    }

    .source_content--show {
      display: block;
    }

    .source_text {
      margin: 0;
      padding: 0;
      text-align: left;
      color: #787878;
      font-size: 14px;
    }

    .source_btn {
      margin: 0 0 0 auto;
      width: 150px;
      padding: 0;
      padding: 5px 0;
      text-align: left;
      font-size: 14px;
    }

    .source_btn:hover {
      background-color: #EEE;
    }
  `;

  render() {
    return html `

    <div>${this._processHtml()}<div>
    <script>

    </script>
   `;
  }

  constructor() {
    super();
    console.log("constructor");
    this.accession="G06334MO";
    this.sampleids={};
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("cc");
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
            URL: <a href="${this.sampleids[item].partnerurl}" target="_blank">${this.sampleids[item].partnerurl}</a>
          </p>
        </div>
		  </div>
    </li>
    `)}
    </ul>
    `;
  }

  fromButton(){
    Array.prototype.forEach.call(document.selectAll('.source_btn'), function (el) {
    el.addEventListener('click', function (e) {
      e.currentTarget.nextElementSibling.classList.toggle('source_content--show');
    });
    }); 
  }
}

customElements.define('gtc-wc-external', GtcWcExternal);
