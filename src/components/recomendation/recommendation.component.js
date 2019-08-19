import html from './recommendation.component.html';
import style from './recommendation.component.scss';


export class Recommendation extends HTMLElement {
  
  constructor() {
    super();
    // Shadow root
  }



  connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
  }


}
export  const RecommendationSelector =  'ze-recommendation';
