import html from './home.component.html';
import style from './home.component.scss';
import { getTrials } from '../../services/trials.api';


export class Home extends HTMLElement {
  
 
  async connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;

    console.log(this.trials);
    this.trials = await getTrials();
    
    this.trials.forEach(trial => {
      const  card = document.createElement('ze-card');
      card.trial = trial;
      this.querySelector('.votes').appendChild(card);
    });
  }


}
export  const HomeSelector =  'ze-home';
