import TariffPage from '../pages/TariffPage.js'

export default class FilterPage{
    constructor(){
        this.ActionSelector = '.mps-tab-list';
        this.DslSelector = 'DSL';
        this.CalculatorSelector = '#mps-tab-box-5';
        this.PageFormSelector = '.page-default-signup';
        this.VorwahlSelector = 'Ihre Vorwahl';
        this.FindButton = '[type="submit"]';
        this.ProgressPopupSelector = 'telco-splash';
        this.ListSelector = '[ng-controller="productController"]';
        this.TariffInfoButtonSelector = '[class="responsive-label-txt resultlist-cta"]';
        this.NextTariffSelector = '[class="pagination-area"]';
        this.NextTariffButtonSelector = '[ng-click="getAndDisplayNextPage()"]';
    }

    openPage(path = '/'){
        cy.visit(path);
    }

    clickOnElement(blockSelector, elementSelector){
        cy.get(blockSelector)
          .contains(elementSelector)
          .click({force: true});
    }

    selectDSL(){
        this.clickOnElement(this.ActionSelector, this.DslSelector);
        cy.waitUntilVisible(cy.get(this.CalculatorSelector));
    }

    typeToCalculator(value){
        cy.get(this.CalculatorSelector)
          .within((form) => {
              cy.get(this.PageFormSelector)
                .contain(this.VorwahlSelector)
                .type(value, {force: true})
          })
    }

    startSearch(){
        cy.get(this.FindButton)
          .click({forve: true});
    }

    validateList(){
        cy.waitUntilExist(this.ProgressPopupSelector);
        cy.get(this.ListSelector).should( ($list) => {
            expect($list.length()).to.be.at.least(5)
        })
    }

    validateFirstTarif(){
        let tariff = new TariffPage();
        cy.waitUntilExist(this.ProgressPopupSelector);
        cy.get(this.ListSelector)
          .first()
          .then( ($element) => {
              cy.get(this.TariffInfoButtonSelector)
                .click({force : true})
          });
        tariff.validateElementsIsPresent();
    }

    validateTariffCounter(count){
        cy.waitUntilExist(this.ProgressPopupSelector);
        cy.get(this.ListSelector).should( ($list) => {
            expect($list).to.have.length(count);
        });
        cy.get(this.NextTariffSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .should('exist');
        cy.get(this.NextTariffButtonSelector)
          .click({force: true});
        cy.get(this.ListSelector).should( ($list) => {
            expect($list).to.have.length(count*2);
        })
    }


}

