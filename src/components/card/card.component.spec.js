import mock from 'xhr-mock';
import { CardSelector, ValueSelectedEnum } from "./card.component";
import { trials } from '../../../tools/mockData';
import { dateDiference } from "../../services/date.utils";
import fetchMock from 'fetch-mock';

describe("Card Component", () => {
  let trialMock = trials[0];
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => {
    fetchMock.put('http://localhost:8080/api/trials/undefined', { ...trialMock });
  });

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => {
    fetchMock.restore();
  });



  it("should create", () => {
    const testInstance = document.createElement(CardSelector);
    expect(testInstance).toBeDefined();
  });

  describe("Html Render Correct", () => {
    it("Title", () => {
      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      expect(testInstance.querySelector('.content :first-child').innerHTML).toEqual(trialMock.name);
    });
    it("Time ago", () => {
      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      const showDate = dateDiference(new Date(trialMock.date), new Date());
      const expectValue = `<span>${showDate.months} months ago </span> in  ${trialMock.category}`;
      expect(testInstance.querySelector('.content .time').innerHTML).toEqual(expectValue);
    });
    it("Likes percent", () => {
      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);

      expect(testInstance.querySelector('.results .likes span').innerHTML).toEqual('34%');
    });
    it("Dislikes percent", () => {
      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      expect(testInstance.querySelector('.results .dislikes span').innerHTML).toEqual('66%');
    });
  });

  describe('Voting', () => {

    it('should vote like', () => {

      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      testInstance.valueSelected = ValueSelectedEnum.LIKE;
      testInstance.manageVoting();



      expect(testInstance.trial.likes).toEqual(2);
    });

    it('should vote like', () => {

      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      testInstance.valueSelected = ValueSelectedEnum.DISLIKE;
      testInstance.manageVoting();
      expect(testInstance.trial.dislikes).toEqual(3);

    });

    it('should change text button ', () => {

      const testInstance = document.createElement(CardSelector);
      testInstance.trial = { ...trialMock };
      document.body.appendChild(testInstance);
      testInstance.valueSelected = ValueSelectedEnum.DISLIKE;
      testInstance.isVoted = false;
      testInstance.manageVoting();
      setTimeout(() => {
        expect(testInstance._$button.innerHTML).toEqual('Vote again');
      }, 100);

    });


  });
});
