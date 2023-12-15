describe('HomePage', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/topics/test-automation/exercise-5');
		cy.injectAxe();
	});

	it('should have a Portal Switcher', () => {
		cy.get('.portal-switcher').contains('Insurance Agent Portal');
	});

	it('should have no accessibility violations', () => {
		cy.checkA11y({
			exclude: ['div#portal-root'],
		});
	});
});
