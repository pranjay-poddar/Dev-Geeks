(() => {
    const canvas = document.getElementById('background');
    const context = canvas.getContext('2d');
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    const numberOfStars = 50;
    const random = (min, max) => Math.random() * (max - min) + min;

    canvas.width = width;
    canvas.height = height;

    const drawBackground = () => {
        const background = context.createLinearGradient(0, 0, 0, height);
        background.addColorStop(0, '#000B27');
        background.addColorStop(1, '#6C2484');
    
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
    };

    const drawForeground = () => {
        context.fillStyle = '#0C1D2D';
        context.fillRect(0, height * .95, width, height);
    
        context.fillStyle = '#182746';
        context.fillRect(0, height * .955, width, height);
    };

    const drawWizard = () => {
        const image = new Image();
        image.src = 'https://i.ibb.co/bXKK5bq/wizard.png';
        
        image.onload = function () {
            /**
             * this - references the image object
             * draw at 90% of the width of the canvas - the width of the image
             * draw at 95% of the height of the canvas - the height of the image 
             */
            context.drawImage(this, (width * .9) - this.width, (height * .95) - this.height);
        };
    };

    const drawStars = () => {
        let starCount = numberOfStars;

        context.fillStyle = '#FFF';

        while (starCount--) {
            const x = random(25, width - 50);
            const y = random(25, height * .5);
            const size = random(1, 5);

            context.fillRect(x, y, size, size);
        }
    };

    drawBackground();
    drawForeground();
    drawWizard();
    drawStars();
})();