import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortalSwitcher from './PortalSwitcher';

const RenderComponent = ({ ...props }) => render(<PortalSwitcher {...props} />);

describe('Portal Switcher', () => {
	it('renders', () => {
		RenderComponent({});
		const container = screen.getByTestId('portal-switcher');
		expect(container).toBeInTheDocument();
	});

	it('navigates to the Agent landing page', async () => {
		RenderComponent({});
		const portalLinkTarget = screen.getByRole('link', { name: /Insurance Agent Portal/ });

		// this test would be ideal in e2e where we can be sure it will navigate
		expect(portalLinkTarget.getAttribute('href')).toBe('/account/agents/');
	});

	it('toggles the portal switcher with the keyboard', async () => {
		RenderComponent({});

		const toggleButton = screen.getByRole('button', { name: /Toggle portal menu/ });

		await userEvent.type(toggleButton, '{enter}');

		waitFor(async () => await screen.getByRole('link', { name: /Broker Portal/ }));

		waitFor(async () => await expect(screen.getByRole('link', { name: /Broker Portal/ })).toBeVisible());

		waitFor(async () => userEvent.type(screen.getByRole('link', { name: /Broker Portal/ }), '{escape}'));

		waitFor(async () => {
			await expect(toggleButton).toHaveFocus();
		});
	});
});
