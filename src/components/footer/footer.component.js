import html from './footer.component.html';
import style from './footer.component.scss';


export class Footer extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
  }


}
export const FooterSelector = 'ze-footer';
