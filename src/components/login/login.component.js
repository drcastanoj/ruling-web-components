
export class Login extends HTMLElement {

 

  connectedCallback() {
    this.innerHTML = `
    <article class="container">
      <h1> Login<h1>
    </article> 
    `;
  }


}
export const LoginSelector = 'ze-login';
