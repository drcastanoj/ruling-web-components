import { HeaderSelector, Header } from './header/header.component';
import { AppSelector, App } from './app/app.component';
import '../styles/index.scss';
import { Card, CardSelector } from './card/card.component';
import { Message, MessageSelector } from './message/message.component';
import { RecommendationSelector, Recommendation } from './recomendation/recommendation.component';
import { FooterSelector, Footer } from './footer/footer.component';
import { PastTrials, PastTrialsSelector } from './past-trials/past-trials.component';
import { HowItWorks, HowItWorksSelector } from './how-it-works/how-it-works.component';
import { HomeSelector, Home } from './home/home.component';
import { LoginSelector, Login } from './login/login.component';
function setupComponents() {
  const components = [{
    selector: HeaderSelector,
    controller: Header
  },
  {
    selector: AppSelector,
    controller: App
  },
  {
    selector: CardSelector,
    controller: Card
  },
  {
    selector: MessageSelector,
    controller: Message
  },
  {
    selector: RecommendationSelector,
    controller: Recommendation
  },
  {
    selector: FooterSelector,
    controller: Footer
  },
  {
    selector: PastTrialsSelector,
    controller: PastTrials
  },
  {
    selector: HowItWorksSelector,
    controller: HowItWorks
  },
  {
    selector: HomeSelector,
    controller: Home
  },
  {
    selector: LoginSelector,
    controller: Login
  }
  ];

  components.forEach((value) => {
    const { selector, controller } = value;
    window.customElements.define(selector, controller);
  });

}

setupComponents();
