import html from './card.component.html';
import style from './card.component.scss';

/// I am loding the images, they could be in another server
import '../../styles/images/01.jpg';
import '../../styles/images/02.jpg';
import '../../styles/images/03.jpg';
import '../../styles/images/04.jpg';
import { saveTrials } from '../../services/trials.api';
import { dateDiference } from '../../services/date.utils';

export const ValueSelectedEnum = {
  LIKE: 'likes',
  DISLIKE: 'dislikes'
};

export class Card extends HTMLElement {

  constructor() {
    super();
    this._trial = null;
    this._$iconLike = null;
    this._$iconDislike = null;
    this._$button = null;
    this.isVoted = false;
    this.valueSelected = null;
    // Shadow root
  }

  set trial(trial) {
    if (this._trial === trial) return;
    this._trial = trial;
    this._render();
  }

  get trial() {
    return this._trial;
  }



  connectedCallback() {
    this.innerHTML = `
      <style>
        ${style}
      </style>
        ${html}
    `;
    this._$iconLike = this.querySelector('.voting .icon-thumbs-up');
    this._$iconLike.addEventListener('click', () => {
      this.valueSelected = ValueSelectedEnum.LIKE;
      this._render();
    });

    this._$iconDislike = this.querySelector('.voting .icon-thumbs-down');
    this._$iconDislike.addEventListener('click', () => {
      this.valueSelected = ValueSelectedEnum.DISLIKE;
      this._render();

    });

    this._$button = this.querySelector('.voting button');
    this._$button.addEventListener('click', () => {
      this.manageVoting();
    });

    this._render();
  }

  _render() {
    if (!this.trial && !this.innerHTML) return;
    const { image, name, date, category, description, likes, dislikes } = this.trial;

    const card = this.querySelector('.card');
    if (!card) return;
    card.style.backgroundImage = `url('src/styles/images/${image}')`;
    const content = this.querySelector('.content');
    content.querySelector(':first-child').innerHTML = name;
    const difference = dateDiference(new Date(date), new Date());
    content.querySelector('.time').innerHTML = `<span>${difference.months} months ago </span> in  ${category}`;
    content.querySelector('.description').innerHTML = description;

    const nLikes = parseInt(likes);
    const nDislikes = parseInt(dislikes);
    const total = nLikes + nDislikes;
    const likesPercentage = Math.ceil(this.calculatePercentage(total, nLikes)) + '%';
    const $likes = this.querySelector('.results  >.likes');
    $likes.style.width = likesPercentage;
    $likes.querySelector('span').innerHTML = likesPercentage;
    const dislikesPercentage = Math.floor(this.calculatePercentage(total, nDislikes)) + '%';
    const $dislikes = this.querySelector('.results .dislikes');
    $dislikes.style.width = dislikesPercentage;
    $dislikes.querySelector('span').innerHTML = dislikesPercentage;

    if (nLikes >= nDislikes) {
      card.querySelector('i').className = 'icon icon-thumbs-up';
    } else {
      card.querySelector('i').className = 'icon icon-thumbs-down';
    }

    if (this.valueSelected === ValueSelectedEnum.LIKE) {
      this._$iconLike.classList.add('selected');
      this._$iconDislike.classList.remove('selected');

    } else if (this.valueSelected === ValueSelectedEnum.DISLIKE) {
      this._$iconDislike.classList.add('selected');
      this._$iconLike.classList.remove('selected');
    }    else if (!this.valueSelected) {
      this._$iconDislike.classList.remove('selected');
      this._$iconLike.classList.remove('selected');
    }

  }

  calculatePercentage(total, value) {
    return (value * 100) / total;
  }

  async manageVoting() {
    if(!this.valueSelected && !this.isVoted) return;
    if (!this.isVoted) {
      const newTrial = await saveTrials(this.trial, this.valueSelected);
      this.valueSelected = null;
      this.trial = newTrial;
      this._$button.innerHTML = 'Vote again';
      this.querySelector('.description').innerHTML = 'Thank you for voting';

    } else {
      this._$button.innerHTML = 'Vote now';
      this.querySelector('.description').innerHTML = this.trial.description;
    }
    this.isVoted = !this.isVoted;
    this._$iconLike.classList.toggle('hide');
    this._$iconDislike.classList.toggle('hide');
  }
}
export const CardSelector = 'ze-card';
