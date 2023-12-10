/// <reference types='cypress'/>

context('Wait',()=>{
    //primero se define la url, en este caso toma la baseUrl+ cy.visit.
    beforeEach(()=>{
        cy.visit('/');
    })

    //haciendo el caso de prueba
    it('Test #1 - esperar un tiempo específico',()=>{
       cy.get('#ajaxButton').click();
       cy.wait(16000);
       cy.get('#content').should('contain','Data loaded with AJAX get request.')
    });

    it.only('Test #2 - esperar con una expectativa BDD',()=>{
        cy.get("#ajaxButton").click();
        cy.get("#content .bg-success").should("be.visible").and("Data loaded with AJAX get request.");
        //  cy.get("#content").should("contain","Data loaded with AJAX get request.");
    });
    
    it('Test #3 - esperar a que el servicio devuelva una respuesta',()=>{
        cy.intercept('/').as('getRespuesta');

        cy.wait('@getRespuesta',{timeout:26000})
            .its('response.statusCode')
            .should('eq',200)
    });
   
});