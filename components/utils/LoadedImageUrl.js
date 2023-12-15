const LoadedImageUrl = (imageMap = {}, imageSrc = '') => {
	// imageMap glob returns images with extension as key ({png:''})
	const imageObj = imageMap[imageSrc.split('.')[0]];

	// Access child property no matter the file extension
	const imageUrl = imageObj[Object.keys(imageObj)[0]];

	return imageUrl;
};

export default LoadedImageUrl;
