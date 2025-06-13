describe('should be correcktly visible main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('the title should be visible', () => {
    cy
      .get(".page-header__title")
      .contains("Идёмвкино")
      .should('be.visible');
  });
  it('should be 7 calendar days', () => {
    cy
      .get("nav.page-nav > a")
      .should('have.length', 7);
  });
});

describe('Admin page testing', () => {
  beforeEach (() => {
    cy.visit("http://qamid.tmweb.ru/admin/");
  });

  afterEach (() => {
    cy.clearCookies();
  });

  it('the title shold be visible', () => {
    cy
      .get(".page-header")
      .contains("Администраторррская")
      .should("be.visible");
  });

  it('successful autorization with valid date', () => {
    const admin = require("../fixtures/validadmindate.json");
    cy.get('[for="email"] > .login__input').type(admin.email);
    cy.get("[for='pwd'] > .login__input").type(admin.password);
    cy.get(".login__button").contains("Авторизоваться").click();
    cy.get("#hall-control > .conf-step__header").contains("Управление залами").should("be.visible");
  });

  it('should not autarization with invalid date', () => {
    const admin = require("../fixtures/invalidadmindate.json");
    cy.get('[for="email"] > .login__input').type(admin.email);
    cy.get("[for='pwd'] > .login__input").type(admin.password);
    cy.get(".login__button").contains("Авторизоваться").click();
    cy.get("body").contains("Ошибка авторизации!").should("be.visible");
  });
});

describe('booking tickets in new hall', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("should successful booling tickets in 777 hall", () => {
    cy.get('nav.page-nav > a').eq(3).click();
    cy
      .contains('Мир Юрского периода')
      .closest('section.movie')
      .contains('777')
      .parent()
      .find('.movie-seances__time-block')
      .contains('22:00')
      .click();
    const seats = require("../fixtures/seats.json");
    seats.forEach((seat) => {
    cy.get(
      `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
    ).click();
    });
    cy.get(".acceptin-button").click();
    
    cy
      .get('.ticket__info-wrapper')
      .contains('777 зал')
      .should('be.visible');
    
    cy
      .contains('Получить код бронирования')
      .should('be.visible')
      .should('not.be.disabled');
  });
})