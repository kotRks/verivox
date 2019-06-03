import TariffPage from '../pages/TariffPage.js'

export default class FilterPage{
    constructor(){
        this.ActionSelector = '.mps-tab-list';
        this.DslSelector = 'DSL';
        this.CalculatorSelector = '#mps-tab-box-5';
        this.VorwalhSelector = '[class="float-label-input"]';
        this.FindButton = '[type="submit"]';
        this.ListSelector = '[class="product-list"]'
        this.ListElementSelector = '[class="products-table-full-width result-table"]';
        this.NextTariffSelector = '[class="pagination-area"]';
        this.NextTariffButtonSelector = '[ng-click="getAndDisplayNextPage()"]';
        this.TariffInfoButtonSelector = '[class="responsive-label-txt resultlist-cta"]';
    }

    openPage(path = '/'){
        cy.visit(path);
    }

    clickOnElement(blockSelector, elementSelector){
        cy.get(blockSelector)
          .contains(elementSelector)
          .click({force: true});
    }

    TypeToDSl(value){
        cy.log('second - ', value);
        cy.get(this.CalculatorSelector).find(this.VorwalhSelector).type(value);
    }

    selectDSL(value){
        this.clickOnElement(this.ActionSelector, this.DslSelector);
    }

    typeToCalculator(value){
        cy.log('first - ', value );
        this.TypeToDSl(value);
    }

    startSearch(){
        cy.get(this.CalculatorSelector).find(this.FindButton).click({force: true});
    }

    validateList(){
        cy.server()
        cy.route({
            method: 'POST',
            url: '/applications/broadband/service/hook/offers/broadband/prefix/030/',
            delay: 20000
        }).as('AddResult');

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .its('length')
          .should('be.gte', 5)
    }

    validateFirstTarif(){
        cy.server()
        cy.route({
            method: 'POST',
            url: '/applications/broadband/service/hook/offers/broadband/prefix/030/',
            delay: 20000
        }).as('AddResult');

        cy.get('@AddResult');
        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .first()
          .within( ($element) => {
              cy.get(this.TariffInfoButtonSelector)
                .click({force : true})
          });
        let tariff = new TariffPage();
        tariff.validateElementsIsPresent();
    }

    validateTariffCounter(count){
        cy.server()
        cy.route({
            method: 'POST',
            url: '/applications/broadband/service/hook/offers/broadband/prefix/030/',
            delay: 20000
        }).as('AddResult');

        cy.get('@AddResult');
        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .should('have.length', count + 1);

        cy.get(this.NextTariffSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .click({force: true});


        cy.get('@AddResult');
        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .should('have.length', count * 2 + 1);
    }


}

