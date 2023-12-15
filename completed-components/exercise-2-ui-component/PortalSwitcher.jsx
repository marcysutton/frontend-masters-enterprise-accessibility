import { useState, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const PortalSwitcher = ({ ...props }) => {
	const [isChangePortalShowing, setIsChangePortalShowing] = useState(false);
	const toggleButton = useRef(null);

	const toggleHandler = (event) => {
		if (event.code === 'Enter' || event.code === 'Space') {
			event.preventDefault();
			setIsChangePortalShowing(!isChangePortalShowing);
		}
	};
	const escapeKeyHandler = (event) => {
		if (event.code === 'Escape' && isChangePortalShowing) {
			setIsChangePortalShowing(false);

			if (toggleButton && toggleButton.current) {
				toggleButton.current.focus();
			}
		}
	};
	return (
		<div className={'portal-switcher'} {...props}>
			<div
				onKeyDown={(event) => escapeKeyHandler(event)}
				onMouseEnter={() => setIsChangePortalShowing(true)}
				onMouseLeave={() => setIsChangePortalShowing(false)}>
				<div className="logo-row">
					<img
						className="logo"
						src="https://res.cloudinary.com/dsrqk3ngz/image/upload/v1702580644/insurance-agency-meta_ujrtfn.png"
						width={75}
						alt="Insurance Company"
					/>
					<div className="text-col">
						<a href="/account/agents">Insurance Agent Portal</a>

						<div className="change-portal-text" data-testid="change-portal-trigger">
							<button
								aria-label="Toggle portal menu"
								aria-expanded={isChangePortalShowing ? 'true' : 'false'}
								className="ml-4 focus-visible:ring-2"
								onKeyDown={(event) => toggleHandler(event)}
								ref={toggleButton}>
								Change Portal
								<FaChevronDown className="icon" />
							</button>
						</div>
					</div>
				</div>
				{isChangePortalShowing && (
					<div className="inner-portals">
						<a href="/account/brokers/" className="broker-link" data-testid="broker-portal-link">
							Broker Portal
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default PortalSwitcher;
