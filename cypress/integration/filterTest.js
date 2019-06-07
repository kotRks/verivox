import StartPage from '../pages/StartPage.js'
import SearchResultPage from '../pages/SearchResultPage.js'

const page = new StartPage();
const searchPage =  new SearchResultPage();

describe('Test cases', function() {
    beforeEach(() => {
        page.openPage();
    });

    it('Scenario 1: DSL Result List - verify result list', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        searchPage.validateList();
    });

    it('Scenario 2: Result List - verify Offer detail page', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        searchPage.validateFirstTarif();
    });

    it('Scenario 3: Lazy loading/pagination for loading the Result List', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        searchPage.validateTariffCounter(20);
    })
});