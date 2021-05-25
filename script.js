var rgb = document.getElementById("rgb");
var hex = document.getElementById("hex");
var cmyk = document.getElementById("cmyk");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.getElementById("btn");



function setGradient() {
	body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
	rgb.textContent = "RGB: " + hexToRgb(color1.value) + "  |  " + hexToRgb(color2.value);
	hex.textContent = `HEX: ${color1.value}  |  ${color2.value}`
	cmyk.textContent = "CMYK: " + hexToCMYK(color1.value) + "  |  " + hexToCMYK(color2.value)
	hsl.textContent = "HSL: " + HexToHsl(color1.value) + "  |  " + HexToHsl(color2.value)
}

color1.addEventListener("input", setGradient)

color2.addEventListener("input", setGradient)

function randomHex() {
	// const randomColor = Math.floor(Math.random() * 16777215).toString(16);

	// return "#" + randomColor;
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;

}

button.addEventListener("click", function () {
	color1.value = randomHex();
	color2.value = randomHex();
	setGradient();
});

button.addEventListener("mouseover", function () {
	button.backgroundColor = randomHex();
});



//code to convert hex to RGB
function hexToRgb(hex) {
	var hextoRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	r = parseInt(hextoRGB[1], 16);
	g = parseInt(hextoRGB[2], 16);
	b = parseInt(hextoRGB[3], 16);

	return "(" + r + ", " + g + ", " + b + ")";
	//returns result formated like this: (64, 224, 208)
}

//code for converting hex to CMYK
function hexToCMYK(hex) {
	var computedC = 0;
	var computedM = 0;
	var computedY = 0;
	var computedK = 0;

	hex = (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;

	if (hex.length != 6) {
		alert('Invalid length of the input hex value!');
		return;
	}
	if (/[0-9a-f]{6}/i.test(hex) != true) {
		alert('Invalid digits in the input hex value!');
		return;
	}

	var r = parseInt(hex.substring(0, 2), 16);
	var g = parseInt(hex.substring(2, 4), 16);
	var b = parseInt(hex.substring(4, 6), 16);

	// BLACK
	if (r == 0 && g == 0 && b == 0) {
		computedK = 1;
		return 0 + "%, " + 0 + "%, " + 0 + "%, " + 1 + "%";
	}

	computedC = 1 - (r / 255);
	computedM = 1 - (g / 255);
	computedY = 1 - (b / 255);

	var minCMY = Math.min(computedC, Math.min(computedM, computedY));

	computedC = Math.round(((computedC - minCMY) / (1 - minCMY)) * 100);
	computedM = Math.round(((computedM - minCMY) / (1 - minCMY)) * 100);
	computedY = Math.round(((computedY - minCMY) / (1 - minCMY)) * 100);
	computedK = Math.round(minCMY * 100);

	return computedC + "%, " + computedM + "%, " + computedY + "%, " + computedK + "%";
	//returns result formated like this: 71%, 0%, 7%, 12%
}


// code to convert hex to hSL, can easily be changed to rgb to hsl
function HexToHsl(hex) {
	//remove first four line to change function to rgbtoHSL(r,g,b)
	var hextoRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	r = parseInt(hextoRGB[1], 16);
	g = parseInt(hextoRGB[2], 16);
	b = parseInt(hextoRGB[3], 16);

	var min, max, i, l, s, maxcolor, h, rgb = [];
	rgb[0] = r / 255;
	rgb[1] = g / 255;
	rgb[2] = b / 255;
	min = rgb[0];
	max = rgb[0];
	maxcolor = 0;
	for (i = 0; i < rgb.length - 1; i++) {
		if (rgb[i + 1] <= min) { min = rgb[i + 1]; }
		if (rgb[i + 1] >= max) { max = rgb[i + 1]; maxcolor = i + 1; }
	}
	if (maxcolor == 0) {
		h = (rgb[1] - rgb[2]) / (max - min);
	}
	if (maxcolor == 1) {
		h = 2 + (rgb[2] - rgb[0]) / (max - min);
	}
	if (maxcolor == 2) {
		h = 4 + (rgb[0] - rgb[1]) / (max - min);
	}
	if (isNaN(h)) { h = 0; }
	h = h * 60;
	if (h < 0) { h = h + 360; }
	l = (min + max) / 2;
	if (min == max) {
		s = 0;
	} else {
		if (l < 0.5) {
			s = (max - min) / (max + min);
		} else {
			s = (max - min) / (2 - max - min);
		}
	}
	s = s;
	return Math.round(h) + "\u00B0, " + Math.round(s * 100) + "%, " + Math.round(l * 100) + "% "; //returns result formated like this: 174°, 72%, 56% 
}