export default class TariffInfo{
    constructor(){
        this.TariifAmount = '[class="price"]';
        this.FirstInfoButton = '[data-description="firstAvailabilityCheckButton"]';
        this.SecondInfoButton = '[data-description="secondAvailabilityCheckButton"]';
        this.TariffName = '.tariff-details > .group-header';
        this.SecondAmount = '[class="average-price"]';
    }

    elementOnPage(elementSelector){
        cy.get(elementSelector)
          .should('exist')
          .and('be.visible')
    }

    validateElementsIsPresent(){
        this.elementOnPage(this.TariifAmount);
        this.elementOnPage(this.FirstInfoButton);
        this.elementOnPage(this.SecondInfoButton);
        this.elementOnPage(this.TariffName);
        this.elementOnPage(this.SecondAmount);
    }
}