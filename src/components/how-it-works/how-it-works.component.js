
export class HowItWorks extends HTMLElement {

 
  connectedCallback() {
    this.innerHTML = `
    <article class="container">
      <h1> How it works<h1>
    </article> 
    `;
  }


}
export const HowItWorksSelector = 'ze-how-it-works';
