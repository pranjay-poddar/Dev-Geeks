//Initial Reference
let eyesLink = ["14pwWeS7jjR5lJHI8Gez_YzGSKPYibfBM", "1mMo-m_i8DDgIEJG6IQvi-l70wZx87DuD", "1e3r8glpuD1oERXvDt_ANzQs3HmBI8eLp", "1n4Jo7enRfgMQNSSakqVuKwuC99FmcQ-V", "1mUaiOeMr9xB0L-yvz_xzGzXnguMh7L4-"];
let eyebrowLink = ['1IRBP4YeFlbAxTe3d8_8C9j6EVExOeNjS', '1aUMO08E9OeIqI9H_SNp1HDw1whnH0RWC', '1xkBsZEHokxL2mqDtxTPXeEFewoab2THC', '1GdHMZEm42Qr-gblTmffDlHXeUzHXIfZu'];
let mouthLink = ['1zw0GzwGq_najyk3DsxTWW25MwZ50epdi', '1FdracMUwlyZMdD-6e1pzHE0w8D9aBqPR', '1Nyza96PWpelZ1VzHp_O-O-m9K-OgPFYk', '1Ctq9WgUmqwxnXG4biJ58oHAHBFrN88Lq', '1VOnVY2deGQWaEnlGn2LsiI4we31VORyl'];
let colors = ["#4bff81", "#4bb4ff", "#ff702e", "#b88cff", "#ffd21f"];

let emoji = document.querySelector(".emoji");

let eyes = document.querySelector(".eyes");
let eyebrows = document.querySelector(".eyebrows");
let mouth = document.querySelector(".mouth");

let colorBtn = document.getElementById("color");
let eyesBtn = document.getElementById("eyes");
let eyebrowsBtn = document.getElementById("eyebrows");
let mouthBtn = document.getElementById("mouth");
let wait = document.querySelector('.wait');

//Setting up counters
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;

//Setting up total counts for different images
let totalCounts = {
	eyeCount: 5,
	eyebrowsCount: 4,
	mouthCount: 5,
};

//Adding event listener to each button
colorBtn.addEventListener("click", () => {
	emoji.style.backgroundColor = colors[counter1];
	counter1 = counter1 < colors.length - 1 ? counter1 + 1 : 0;
});

eyesBtn.addEventListener("click", () => {
	wait.style.display = '';
	setTimeout(()=> {
		wait.style.display = 'none';
	}, 6000);
	eyes.setAttribute("src", `https://drive.google.com/uc?export=view&id=${eyesLink[counter2]}`);
	counter2 = counter2 < totalCounts.eyeCount - 1 ? counter2 + 1 : 0;
});

eyebrowsBtn.addEventListener("click", () => {
	wait.style.display = '';
	setTimeout(()=> {
		wait.style.display = 'none';
	}, 6000);
	eyebrows.setAttribute("src", `https://drive.google.com/uc?export=view&id=${eyebrowLink[counter3]}`);
	counter3 = counter3 < totalCounts.eyebrowsCount - 1 ? counter3 + 1 : 0;
});

mouthBtn.addEventListener("click", () => {
	wait.style.display = '';
	setTimeout(()=> {
		wait.style.display = 'none';
	}, 6000);
	mouth.setAttribute("src", `https://drive.google.com/uc?export=view&id=${mouthLink[counter4]}`);
	counter4 = counter4 < totalCounts.mouthCount - 1 ? counter4 + 1 : 0;
});
