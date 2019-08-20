import html from './recommendation.component.html';
import style from './recommendation.component.scss';
import '../../styles/images/bg-01.jpg';


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
