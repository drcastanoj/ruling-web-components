import mock from 'xhr-mock';
import { trials } from '../../../tools/mockData';
import { HomeSelector } from './home.component';
import fetchMock from 'fetch-mock';
describe("Home Component", () => {
  // replace the real XHR object with the mock XHR object before each test
  beforeEach(() => {
    fetchMock.get('http://localhost:8080/api/trials/', [...trials]);
  });

  // put the real XHR object back and clear the mocks after each test
  afterEach(() => {
    fetchMock.restore();
  });


  it("should create", () => {
    const testInstance = document.createElement(HomeSelector);
    expect(testInstance).toBeDefined();
  });

  describe('load cards', () => {

    it('should load and set cards', () => {     
      const testInstance = document.createElement(HomeSelector);
      document.body.appendChild(testInstance);
      /// waitn for response 
      setTimeout(()=>{
        expect(testInstance.querySelectorAll('ze-card').length).toEqual(4);
      });
    });

  });
});
