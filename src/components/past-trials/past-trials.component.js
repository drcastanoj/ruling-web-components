
export class PastTrials extends HTMLElement {
  


  connectedCallback() {
    this.innerHTML = `
    <article class="container">
      <h1> Past trials<h1>
    </article>  
    `;
  }


}
export  const PastTrialsSelector =  'ze-past-trials';
