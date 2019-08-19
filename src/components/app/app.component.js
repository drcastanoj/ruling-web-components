import html from './app.component.html';
import style from './app.component.scss';
import { onNavigate } from '../../services/routing';


export class App extends HTMLElement {
  
  constructor() {
    super();
    // Shadow root
  }

  async connectedCallback () {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
    onNavigate('/');
  }

  

 
}
export  const AppSelector =  'ze-app';
