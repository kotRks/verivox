import TariffPage from '../pages/TariffPage.js'

export default class SearcResultPage {
    constructor() {
        this.ListSelector = '[class="product-list"]'
        this.ListElementSelector = '[class="products-table-full-width result-table"]';
        this.NextTariffSelector = '[class="pagination-area"]';
        this.NextTariffButtonSelector = '[ng-click="getAndDisplayNextPage()"]';
        this.TariffInfoButtonSelector = '[class="responsive-label-txt resultlist-cta"]';
    }

    vaitForView(){
        cy.server()
        cy.route({
            method: 'POST',
            url: '/applications/broadband/service/hook/offers/broadband/prefix/030/',
            delay: 20000
        }).as('AddResult');

        cy.get('@AddResult');
    }

    validateList(){
        this.vaitForView();

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .its('length')
          .should('be.gte', 5)
    }

    validateFirstTarif(){
        this.vaitForView();

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
        this.vaitForView();

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .should('have.length', count + 1);

        cy.get(this.NextTariffSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .click({force: true});

        this.vaitForView();

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .should('have.length', count * 2 + 1);
    }
}