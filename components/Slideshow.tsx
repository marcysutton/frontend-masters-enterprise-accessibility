import React, { useState, useRef } from 'react';

const Slideshow = ({ imageData = [], imagePath = '/slideshow/' }) => {
	let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	let [fullScreenMode, setFullScreenMode] = useState(false);

	const btnFullScreenRef = useRef(null);
	const btnCloseRef = useRef(null);
	const slideshowRef = useRef(null);

	console.log(imageData);

	const decrementSlide = () => {
		if (currentSlideIndex > 0) {
			setCurrentSlideIndex(currentSlideIndex - 1);
		} else {
			setCurrentSlideIndex(imageData.length - 1);
		}
	};
	const incrementSlide = () => {
		if (currentSlideIndex < imageData.length - 1) {
			setCurrentSlideIndex(currentSlideIndex + 1);
		} else {
			setCurrentSlideIndex(0);
		}
	};
	const changeSlide = (index) => {
		setCurrentSlideIndex(index);
	};
	const enterFullScreen = () => {
		setFullScreenMode(true);
	};
	const closeFullScreen = () => {
		setFullScreenMode(false);
	};
	const handleScreenClick = (event) => {
		if (!slideshowRef.current.contains(event.target)) {
			setFullScreenMode(false);
		}
	};
	return (
		<>
			<div className="btn-slideshow-fullscreen" onClick={enterFullScreen} ref={btnFullScreenRef}>
				<span className="icon"></span>
			</div>
			<div
				className={`inspiration-slideshow ${fullScreenMode ? 'fullscreen' : ''}`}
				onClick={(event) => handleScreenClick(event)}>
				<div className="slideshow-container" ref={slideshowRef}>
					{imageData &&
						imageData.map((image, index) => {
							return (
								<div className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`} key={index}>
									<div className="numbertext">
										{index + 1} / {imageData.length}
									</div>
									<img src={`${imagePath}${image.src}`} alt={image.alt} style={{ width: '100%' }} />
									<div className="text">{image.caption}</div>
								</div>
							);
						})}

					<a className="prev" onClick={() => decrementSlide()}>
						&#10094;
					</a>
					<a className="next" onClick={() => incrementSlide()}>
						&#10095;
					</a>
				</div>
				<br />

				<ul className="dots">
					{imageData.map((image, index) => (
						<li
							className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
							key={index}
							onClick={() => changeSlide(index)}></li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Slideshow;
