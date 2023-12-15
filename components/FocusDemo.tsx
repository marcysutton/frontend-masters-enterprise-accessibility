import { useRef } from 'react';
const FocusDemo = () => {
	const div1Ref = useRef<HTMLDivElement | null>(null);
	const div2Ref = useRef<HTMLDivElement | null>(null);

	return (
		<div className="grid grid-cols-2 gap-6 w-full my-4">
			<figure>
				<div>
					<button
						className="bg-[#333] text-sm text-white font-bold p-2 rounded"
						onClick={() => {
							div1Ref.current && div1Ref.current.focus();
						}}>
						Click for demo 1
					</button>
					<div ref={div1Ref} className="focus-demo bg-white text-black p-2 my-2" tabIndex={-1}>
						Click me
					</div>
				</div>
				<figcaption className="italic">
					Wrapper <code>div[tabIndex=&ldquo;-1&rdquo;]</code> with :focus
				</figcaption>
			</figure>
			<figure>
				<div>
					<button
						className="bg-[#333] text-sm text-white font-bold p-2 rounded"
						onClick={() => {
							div2Ref.current && div2Ref.current.focus();
						}}>
						Click for demo 2
					</button>
					<div ref={div2Ref} className="focus-visible-demo bg-white text-black p-2 my-2" tabIndex={-1}>
						Click me too
					</div>
				</div>
				<figcaption className="italic">
					Wrapper <code>div[tabIndex=&ldquo;-1&rdquo;]</code> with :focus-visible
				</figcaption>
			</figure>
		</div>
	);
};

export default FocusDemo;
