import { ReactNode, useState } from 'react';

type VisibilityWidgetProps = {
	name: string;
	classesToToggle?: string;
	attributeToToggle?: string;
	children: ReactNode;
};
const VisibilityWidget = ({ name, classesToToggle, attributeToToggle }: VisibilityWidgetProps) => {
	const [isToggled, setIsToggled] = useState(false);

	const toggledClassName = isToggled && classesToToggle ? classesToToggle : '';
	const opts = {};
	if (attributeToToggle && isToggled) {
		opts[attributeToToggle] = 'true';
	}
	return (
		<figure className="flex flex-row my-6 items-center">
			<button
				className="border-2 bg-black rounded-md text-white shadow-inner mr-2 p-2 min-w-[220px]"
				onClick={() => setIsToggled(!isToggled)}>
				Turn {name} {isToggled ? 'off' : 'on'}
			</button>
			<div className={(toggledClassName && toggledClassName) + ' border-2 p-2 min-w-[320px]'} {...opts}>
				Widget content with{' '}
				<a href="#" className="underline">
					a link
				</a>
			</div>
			<div className="ml-2">Content after widget</div>
		</figure>
	);
};
export default VisibilityWidget;
