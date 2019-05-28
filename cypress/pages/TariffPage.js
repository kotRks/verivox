export default class TariffInfo{
    constructor(){
        this.TariifAmount = '[class="price"]';
        this.FirstInfoButton = '[description="firstAvailabilityCheckButton"]';
        this.SecondInfoButton = '[description="secondAvailabilityCheckButton"]';
        this.TariffName = 'class="group-header"';
        this.SecondAmount = '[class="average-price"]';
    }

    elementOnPage(elementSelector){
        cy.get(elementSelector).should('exist').and('be.visible')
    }

    validateElementsIsPresent(){
        this.elementOnPage(this.TariifAmount);
        this.elementOnPage(this.FirstInfoButton);
        this.elementOnPage(this.SecondInfoButton);
        this.elementOnPage(this.TariffName);
        this.elementOnPage(this.SecondAmount);
    }
}