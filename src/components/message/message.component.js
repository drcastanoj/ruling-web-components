import html from './message.component.html';
import style from './message.component.scss';
import '../../styles/images/Main-01.jpg';


export class Message extends HTMLElement {
  
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
  }


}
export  const MessageSelector =  'ze-message';
