/// <reference types="cypress" />

describe('my second test', function(){
    it('visit academic system site', function(){
        cy.visit('http://localhost:3000/subjects')
        cy.url().should('include',"subjects")
    })    
})

describe('login information', function(){
    it('insert value into textbox', function(){
        cy.get("input[type='text']").type('admin')
        cy.get("input[type='password']").type('admin')
    })
})

describe('login', function(){
    it('login into platform', function(){
        cy.get('button').click()
    })
})

describe('verify Subject', function(){
    it('check if Subject exists', function(){
        cy.get('table >tbody').contains('Inglés')
    })
})

