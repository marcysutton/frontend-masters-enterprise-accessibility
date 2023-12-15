import { useState } from 'react';
import { IconDownArrow } from './Icons';

const PortalSwitcher = ({ children, ...props }) => {
	const [isChangePortalShowing, setIsChangePortalShowing] = useState(false);
	return (
		<div className={'portal-switcher'} {...props}>
			<div onMouseEnter={() => setIsChangePortalShowing(true)} onMouseLeave={() => setIsChangePortalShowing(false)}>
				<div className="logo-row">
					<a href="/account/agents">
						<img
							className="logo"
							src="https://res.cloudinary.com/dsrqk3ngz/image/upload/v1702580644/insurance-agency-meta_ujrtfn.png"
							width={75}
						/>
					</a>
					<div className="text-col">
						<div onClick={() => (window.location.href = '/account-agents')}>Insurance Agent Portal</div>

						<div className="change-portal-text" data-testid="change-portal-trigger">
							Change Portal
							<IconDownArrow />
						</div>
					</div>
				</div>
				{isChangePortalShowing && (
					<div className="inner-portals">
						<div
							onClick={() => (window.location.href = '/account/brokers/')}
							className="broker-link"
							data-testid="broker-portal-link">
							Broker Portal
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PortalSwitcher;
