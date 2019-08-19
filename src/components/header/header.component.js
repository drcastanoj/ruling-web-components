import html from './header.component.html';
import style from './header.component.scss';
import '../../styles/images/Main-01.jpg';
import { onNavigate } from '../../services/routing';


export class Header extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
    this._render();
    this.getElementsByTagName('a').forEach(element => {
      element.addEventListener('click', event => {
        if (event || event.target || event.target.dataset) {
          const {route} = event.target.dataset;
          onNavigate(route);
        }
      });
    });;
  }

  _render() {
  }

  onNavigate() {
    onNavigate(route);
  }

}
export const HeaderSelector = 'ze-header';
