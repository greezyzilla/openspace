import { goto, login } from '../helpers';

describe('Thread Spec', () => {
  describe('Default Behavior', () => {
    it('Should render home page correctly on large device', () => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000/');

      cy.get('article').should('have.length.gte', 2);
      cy.get('h5').should('have.length', 8);
      cy.get('[data-cy=btn-search-text]').should('be.visible');
      cy.get('[data-cy=btn-post-lg]').should('be.visible');
      cy.get('[data-cy=btn-post-sm]').should('not.be.visible');
      cy.get('[data-cy=left-sidebar]').should('be.visible');
      cy.get('[data-cy=right-sidebar]').should('be.visible');
    });

    it('Should render home page correctly on medium device', () => {
      cy.viewport('ipad-mini');
      cy.visit('http://localhost:3000/');

      cy.get('article').should('have.length.gte', 2);
      cy.get('h5').should('have.length', 8);
      cy.get('[data-cy=btn-search-text]').should('be.visible');
      cy.get('[data-cy=btn-post-lg]').should('be.visible');
      cy.get('[data-cy=btn-post-sm]').should('not.be.visible');
      cy.get('[data-cy=left-sidebar]').should('be.visible');
      cy.get('[data-cy=right-sidebar]').should('not.be.visible');
    });

    it('Should render home page correctly on small device', () => {
      cy.viewport('iphone-8');
      cy.visit('http://localhost:3000/');

      cy.get('article').should('have.length.gte', 2);
      cy.get('h5').should('have.length', 8);
      cy.get('[data-cy=btn-search-text]').should('not.be.visible');
      cy.get('[data-cy=btn-post-lg]').should('not.be.visible');
      cy.get('[data-cy=btn-post-sm]').should('be.visible');
      cy.get('[data-cy=left-sidebar]').should('not.be.visible');
      cy.get('[data-cy=right-sidebar]').should('not.be.visible');
    });
  });

  describe('Post a Thread', () => {
    beforeEach(() => cy.viewport('macbook-15'));

    it('Should fire default error if submitting empty form', () => {
      goto('http://localhost:3000/');
      cy.get('[data-cy=btn-post-lg]').parent().click();
      cy.get('button').contains('Publish').click();

      cy.get('input:invalid').should('have.length', 2);
    });

    it('Should fire toast error if submitting empty body', () => {
      goto('http://localhost:3000/');
      cy.get('[data-cy=btn-post-lg]').parent().click();
      cy.get('input[name=title]').type('Test Title');
      cy.get('input[name=category]').type('test');
      cy.get('button').contains('Publish').click();

      cy.get('div').contains('Thread Body Should Not Be Empty').should('be.visible');
    });

    it('Should redirect to login page if submitting without authenticating first', () => {
      goto('http://localhost:3000/');
      cy.get('[data-cy=btn-post-lg]').parent().click();
      cy.get('input[name=title]').type('Test Title');
      cy.get('input[name=category]').type('test');
      cy.get('div.ql-editor').type('test');
      cy.get('button').contains('Publish').click();

      cy.url().should('eq', 'http://localhost:3000/auth/login');
      cy.get('div').contains('Please Login To Continue').should('be.visible');
    });

    it('Should post thread correctly if given valid input', () => {
      login();
      cy.get('button.bg-violet-700').last().click();
      cy.get('input[name=title]').type('Test Title');
      cy.get('input[name=category]').type('test');
      cy.get('div.ql-editor').type('test');
      cy.get('button').contains('Publish').click();

      cy.get('div').contains('Thread Created').should('be.visible');
    });
  });

  describe('Voting Thread, Commenting Thread, Voting Comment', () => {
    it('Should redirect to login page if voting without authenticating', () => {
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      cy.get('[data-cy=buttons-vote-thread-B3N9KGa87vfMHyBQ]').children().first().click();

      cy.url().should('eq', 'http://localhost:3000/auth/login');
      cy.get('div').contains('Please Login To Continue').should('be.visible');
    });

    it('Should fire default error if submitting empty form', () => {
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      cy.get('button').contains('Comment').click();

      cy.get('input:invalid').should('have.length', 1);
    });

    it('Should redirect to login page if commenting without authenticating', () => {
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      cy.wait(1000);
      cy.get('input[name=content]').type('test-comment');
      cy.get('button').contains('Comment').click();

      cy.url().should('eq', 'http://localhost:3000/auth/login');
      cy.get('div').contains('Please Login To Continue').should('be.visible');
    });

    it('Should vote up thread correctly if authenticated', () => {
      login();
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      const btnVote = cy.get('[data-cy=buttons-vote-thread-B3N9KGa87vfMHyBQ]').children().first();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Up Voted').click();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Vote Neutralized').click();
    });

    it('Should vote down thread correctly if authenticated', () => {
      login();
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      const btnVote = cy.get('[data-cy=buttons-vote-thread-B3N9KGa87vfMHyBQ]').children().last();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Down Voted').click();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Vote Neutralized').click();
    });

    it('Should comment correctly if authenticated', () => {
      login();
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      cy.get('a').contains('Halo! Selamat datang dan silakan perkenalkan diri kamu!').should('be.visible');
      cy.wait(2000);

      cy.get('input[name=content]').type('test-comment');
      cy.get('button').contains('Comment').click();

      cy.get('div').contains('Thread Comment Created').should('be.visible');
    });

    it('Should redirect to login page if voting comment without authenticating', () => {
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      cy.get('[data-cy=comment-buttons]').first().children().first()
        .click();

      cy.url().should('eq', 'http://localhost:3000/auth/login');
      cy.get('div').contains('Please Login To Continue').should('be.visible');
    });

    it('Should vote up comment correctly if authenticated', () => {
      login();
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      const btnVote = cy.get('[data-cy=comment-buttons]').first().children().first();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Comment Up Voted').click();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Comment Vote Neutralized').should('be.visible');
    });

    it('Should vote down comment correctly if authenticated', () => {
      login();
      goto('http://localhost:3000/details/thread-B3N9KGa87vfMHyBQ');
      const btnVote = cy.get('[data-cy=comment-buttons]').first().children().last();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Comment Down Voted').click();

      btnVote.click();
      cy.wait(1000);
      cy.get('div').contains('Thread Comment Vote Neutralized').should('be.visible');
    });
  });
});
