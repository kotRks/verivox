import FilterPage from '../pages/FilterPage.js'
const page = new FilterPage();

describe('Test cases', function() {
    beforeEach(() => {
        page.openPage();
    });

    it('First scenario', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateList();
    });

    it('Second scenario', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateFirstTarif();
    });

    it('Third scenario', function() {
        page.selectDSL();
        page.typeToCalculator('030');
        page.startSearch();
        page.validateTariffCounter(20);
    })

});