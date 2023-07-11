window.addEventListener('load', () => {
	const sounds = document.querySelectorAll('.sound');
	const pads = document.querySelectorAll('.pads div');

	pads.forEach((pad, index) => {
		pad.addEventListener('click', function () {
			sounds[index].currentTime = 0;
			sounds[index].play();
		});
	});

	//the drum can be played with the keys A.S,D,J,K,L
	document.addEventListener("keydown", function (event) {
		makeSound(event.key);
		buttonAnimation(event.key);
	});

	function makeSound(key) {
		switch (key) {
			case 'a':
				var closed_hithat = new Audio('https://drive.google.com/uc?export=download&id=1BqpesMF1DTKD6P5bKziK859A53FLQ7D8');
				closed_hithat.play();
				break;
			case 's':
				var kick = new Audio('https://drive.google.com/uc?export=download&id=1IEP0e2eRX6MNGQYsbLq8BR6liUPIKXIX');
				kick.play();
				break;
			case 'd':
				var clap = new Audio('https://drive.google.com/uc?export=download&id=1Y9QNC_TELoVL949YBJURA_M_abaKXHYp');
				clap.play();
				break;
			case 'j':
				var open_hithat = new Audio('https://drive.google.com/uc?export=download&id=1K99q82IX6JZDha4ekeRFgxnCRW-gCRod');
				open_hithat.play();
				break;
			case 'k':
				var snare = new Audio('https://drive.google.com/uc?export=download&id=1OVd8Noj-O_98pAPkxr7_1ups8MY6c5N4');
				snare.play();
				break;
			case 'l':
				var crash = new Audio('https://drive.google.com/uc?export=download&id=1_2ZMglGzvewhzfruLhyWJ8tBFEO-3K_k');
				crash.play();
				break;
		}
	}

	function buttonAnimation(currentKey) {
		var activeButton = document.querySelector("." + currentKey);
		activeButton.classList.add("pressed");
		setTimeout(function () {
			activeButton.classList.remove("pressed");
		}, 100);
	};
});

const themeSwitch = document.querySelector('input');

themeSwitch.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
});
