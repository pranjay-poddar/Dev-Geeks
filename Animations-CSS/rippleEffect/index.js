const button = document.querySelectorAll('a');

button.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const ripples = document.createElement('span');
        ripples.style.left = x + "px";
        ripples.style.top = y + "px";
        this.appendChild(ripples);
    })
})