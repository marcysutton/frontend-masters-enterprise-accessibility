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
});
