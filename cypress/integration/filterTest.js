import FilterPage from '../pages/FilterPage.js'
const page = new FilterPage();

describe('Test cases', function() {
    beforeEach(() => {
        page.openPage();
    });

    it('Scenario 1: DSL Result List - verify result list', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateList();
    });

    it('Scenario 2: Result List - verify Offer detail page', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateFirstTarif();
    });

    it('Scenario 3: Lazy loading/pagination for loading the Result List', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateTariffCounter(20);
    })

});