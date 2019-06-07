
export default class FilterPage{
    constructor(){
        this.ActionSelector = '.mps-tab-list';
        this.DslSelector = 'DSL';
        this.CalculatorSelector = '#mps-tab-box-5';
        this.VorwalhSelector = '[class="float-label-input"]';
        this.FindButton = '[type="submit"]';
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
        cy.get(this.CalculatorSelector)
          .find(this.VorwalhSelector)
          .type(value);
    }

    selectDSL(value){
        this.clickOnElement(this.ActionSelector, this.DslSelector);
    }

    typeToCalculator(value){
        this.TypeToDSl(value);
    }

    startSearch(){
        cy.get(this.CalculatorSelector)
          .find(this.FindButton)
          .click({force: true});
    }
}

