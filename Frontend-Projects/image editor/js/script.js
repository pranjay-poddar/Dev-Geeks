const fileInput = document.querySelector('.file_input');
const chooseImg = document.querySelector('.choose_img');
const previewImg = document.querySelector('.edtr_output img');
const disable = document.querySelector('.edtr_section');
const filterName = document.querySelector('.filter_name');
const filterBtn = document.querySelectorAll('.filter_options button');
const slider = document.querySelector("input[type='range']");
const sliderVal = document.querySelector('.slider_value');
const resetBtn = document.querySelector('.edtr_reset button');
const rotateOptions = document.querySelectorAll('.icons i');
const saveImg = document.querySelector('.save_img');
let brightness = 100,
	saturation = 100,
	inversion = 0,
	grayscale = 0,
	sepia = 0,
	flipHorizontal = 1,
	blur = 0,
	flipVertical = 1,
	hueRotate = 0,
	rotate = 0,
	contrast = 100;

function load() {
	const file = fileInput.files[0];
	if (file.type.split('/')[0] === 'image') {
		previewImg.src = URL.createObjectURL(file);
		previewImg.onload = () => {
			disable.classList.remove('disable');
		};
	}
}

filterBtn.forEach((element) => {
	element.onclick = () => {
		document
			.querySelector('.filter_options .active')
			.classList.remove('active');
		element.classList.add('active');
		filterName.innerText = element.innerText;

		switch (element.id) {
			case 'brightness':
				slider.value = brightness;
				sliderVal.innerText = `${brightness}%`;
				slider.max = '200';
				break;
			case 'saturation':
				slider.value = saturation;
				sliderVal.innerText = `${saturation}%`;
				slider.max = '200';
				break;
			case 'inversion':
				slider.value = inversion;
				sliderVal.innerText = `${inversion}%`;
				slider.max = '100';
				break;
			case 'grayscale':
				slider.value = grayscale;
				sliderVal.innerText = `${grayscale}%`;
				slider.max = '100';
				break;
			case 'blur':
				slider.value = blur;
				sliderVal.innerText = `${blur}px`;
				slider.max = '10';
				break;
			case 'sepia':
				slider.value = sepia;
				sliderVal.innerText = `${sepia}%`;

				slider.max = '100';
				break;
			case 'hue rotate':
				slider.value = hueRotate;
				sliderVal.innerText = `${hueRotate}deg`;

				slider.max = '360';
				break;
			case 'contrast':
				slider.value = contrast;
				sliderVal.innerText = `${contrast}%`;

				slider.max = '400';
				break;
		}
	};
});
function updateFilter() {
	sliderVal.innerText = `${slider.value}%`;
	const selectedFilter = document.querySelector('.filter .active');
	switch (selectedFilter.id) {
		case 'brightness':
			brightness = slider.value;
			break;
		case 'saturation':
			saturation = slider.value;
			break;
		case 'inversion':
			inversion = slider.value;
			break;
		case 'grayscale':
			grayscale = slider.value;
			break;
		case 'sepia':
			sepia = slider.value;
			break;
		case 'blur':
			blur = slider.value;
			sliderVal.innerText = `${slider.value}px`;
			break;
		case 'hue rotate':
			hueRotate = slider.value;
			sliderVal.innerText = `${slider.value}deg`;
			break;
		case 'contrast':
			contrast = slider.value;
			break;
	}
	var filterOptions = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hueRotate}deg) grayscale(${grayscale}%) invert(${inversion}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia})`;
	previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
	previewImg.style.filter = filterOptions;
}
rotateOptions.forEach((element) => {
	element.onclick = () => {
		switch (element.id) {
			case 'left':
				rotate = rotate - 90;
				break;
			case 'right':
				rotate = rotate + 90;
				break;
			case 'horizontal':
				flipHorizontal = flipHorizontal == 1 ? -1 : 1;
				break;
			case 'vertical':
				flipVertical = flipVertical == 1 ? -1 : 1;
				break;
		}
		updateFilter();
	};
});
function resetFilter() {
	brightness = 100;
	saturation = 100;
	inversion = 0;
	grayscale = 0;
	flipHorizontal = 1;
	blur = 0;
	flipVertical = 1;
	rotate = 0;
	sepia = 0;
	filterBtn[0].click();
	updateFilter();
}
chooseImg.onclick = () => {
	fileInput.click();
};
fileInput.onchange = () => {
	load();
};
slider.oninput = () => {
	updateFilter();
};
resetBtn.onclick = () => {
	resetFilter();
};
saveImg.onclick = () => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = previewImg.naturalWidth;
	canvas.height = previewImg.naturalHeight;
	ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hueRotate}deg) grayscale(${grayscale}%) invert(${inversion}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia})`;
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate((rotate * Math.PI) / 180);
	ctx.scale(flipHorizontal, flipVertical);
	ctx.drawImage(
		previewImg,
		-canvas.width / 2,
		-canvas.height / 2,
		canvas.width,
		canvas.height
	);
	const link = document.createElement('a');
	link.download = 'image.jpg';
	link.href = canvas.toDataURL();
	link.click();
	console.log(link.href);
};
