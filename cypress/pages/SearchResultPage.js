import TariffPage from '../pages/TariffPage.js'

export default class SearcResultPage {
    constructor() {
        this.ListSelector = '[class="product-list"]'
        this.ListElementSelector = '[class="products-table-full-width result-table"]';
        this.NextTariffSelector = '[class="pagination-area"]';
        this.NextTariffButtonSelector = '[ng-click="getAndDisplayNextPage()"]';
        this.TariffInfoButtonSelector = '[class="responsive-label-txt resultlist-cta"]';
        this.VisiblePopupSelector = '[class="telco-splash"]'
        this.NotVisiblePopupSelector = '[class="telco-splash no-show"]'
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

    getBlock(blockSelector) {
        return cy.get(blockSelector);
    }

    waitForShowPopup() {
        this.getBlock(this.VisiblePopupSelector).should('exist');
    }

    waitForHidePopup() {
        this.getBlock(this.NotVisiblePopupSelector).should('exist');
    }

    getNewItems(){
        cy.get(this.NextTariffButtonSelector)
          .click({force: true});
        this.vaitForView();
    }

    validateListCount(itemsonPage, counter){
        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .its('length')
          .should('be.gte', (counter - 1) * itemsonPage)
          .and('be.lte', counter * itemsonPage + 1)
    }

    validateList(){
        this.waitForShowPopup();
        this.waitForHidePopup();

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .its('length')
          .should('be.gte', 5)
    }

    validateFirstTarif(){
        this.waitForShowPopup();
        this.waitForHidePopup();

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
        this.waitForShowPopup();
        this.waitForHidePopup();

        cy.get(this.ListSelector)
          .find(this.ListElementSelector)
          .should('have.length', count + 1);

        cy.get(this.NextTariffSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .should('exist');

        this.getNewItems()
        this.validateListCount(count,1);
    }
}