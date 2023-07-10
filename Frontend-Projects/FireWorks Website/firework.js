(() => {
    const canvas = document.getElementById('firework');
    const context = canvas.getContext('2d');

    const width = window.innerWidth;
    const height = window.innerHeight;

    const positions = {
        mouseX: 0,
        mouseY: 0,
        wandX: 0,
        wandY: 0
    };

    const fireworks = [];
    const particles = [];
    const numberOfParticles = 50; // keep in mind performance degrades with higher number of particles

    const random = (min, max) => Math.random() * (max - min) + min;

    const getDistance = (x1, y1, x2, y2) => {
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    };

    const image = new Image();

    let mouseClicked = false;
    
    canvas.width = width;
    canvas.height = height;
    
    image.src = 'https://i.ibb.co/pwdBvnm/wand.png';

    const drawWand = () => {
        positions.wandX = (width * .91) - image.width;
        positions.wandY = (height * .93) - image.height;

        const rotationInRadians = Math.atan2(positions.mouseY - positions.wandY, positions.mouseX - positions.wandX) - Math.PI;
        const rotationInDegrees = (rotationInRadians * 180 / Math.PI) + 360;
        
        context.clearRect(0, 0, width, height);
        
        // Save context to remove transformation afterwards
        context.save();
        context.translate(positions.wandX, positions.wandY);
        
        if (rotationInDegrees > 0 && rotationInDegrees < 90) {
            context.rotate(rotationInDegrees * Math.PI / 180);
        } else if (rotationInDegrees > 90 && rotationInDegrees < 275) {
            context.rotate(90 * Math.PI / 180);
        }

        context.drawImage(image, -image.width, -image.height / 2);

        // Can be used for debugging to see where the edges of the context are
        // context.strokeRect(0, 0, width, height);
        context.restore();
    };

    const attachEventListeners = () => {
        canvas.addEventListener('mousemove', e => {
            positions.mouseX = e.pageX;
            positions.mouseY = e.pageY;
        });

        canvas.addEventListener('mousedown', () => mouseClicked = true);
        canvas.addEventListener('mouseup', () => mouseClicked = false);
    };

    const loop = () => {
        requestAnimationFrame(loop);
        drawWand();

        if (mouseClicked) {
            fireworks.push(new Firework());
            var audio = new Audio("rocket_burst_sound.mp3");
            audio.play();
        }
        
        let fireworkIndex = fireworks.length;
        while(fireworkIndex--) {
            fireworks[fireworkIndex].draw(fireworkIndex);
        }

        let particleIndex = particles.length;
        while(particleIndex--) {
            particles[particleIndex].draw(particleIndex);
        }
        
    };

    image.onload = () => {
        attachEventListeners();
        loop();
    }
    
    function Firework() {
        const init = () => {
            let fireworkLength = 10;

            this.x = positions.wandX;
            this.y = positions.wandY;
            this.tx = positions.mouseX;
            this.ty = positions.mouseY;

            this.distanceToTarget = getDistance(positions.wandX, positions.wandY, this.tx, this.ty);
            this.distanceTraveled = 0;

            this.coordinates = [];
            this.angle = Math.atan2(this.ty - positions.wandY, this.tx - positions.wandX);
            this.speed = 20;
            this.friction = .99;
            this.hue = random(0, 360);

            while (fireworkLength--) {
                this.coordinates.push([this.x, this.y]);
            }
        };

        this.flash = function() {
            context.fillStyle = 'white';
            context.fillRect(this.x - 10, this.y - 10, 20, 20);
          };

        this.animate = index => {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);

            this.speed *= this.friction;

            let vx = Math.cos(this.angle) * this.speed;
            let vy = Math.sin(this.angle) * this.speed;

            this.distanceTraveled = getDistance(positions.wandX, positions.wandY, this.x + vx, this.y + vy);
            
            if(this.distanceTraveled >= this.distanceToTarget) {
                let i = numberOfParticles;
        
                while(i--) {
                    particles.push(new Particle(this.tx, this.ty));
                }

                fireworks.splice(index, 1);
            } else {
                this.x += vx;
                this.y += vy;
            }
        }

        this.draw = index => {
            context.beginPath();
            context.moveTo(this.coordinates[this.coordinates.length - 1][0],
                           this.coordinates[this.coordinates.length - 1][1]);
            context.lineTo(this.x, this.y);

            context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
            context.stroke();

            this.animate(index);
        }

        init();
    }
    
    function Particle(x, y) {
        const init = () => {
            let particleLength = 7;

            this.x = x;
            this.y = y;

            this.coordinates = [];

            this.angle = random(0, Math.PI * 2);
            this.speed = random(1, 10);

            this.friction = 0.95;
            this.gravity = 2;

            this.hue = random(0, 360);
            this.alpha = 1;
            this.decay = random(.015, .03);

            while(particleLength--) {
                this.coordinates.push([this.x, this.y]);
            }
        };

        this.animate = index => {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);

            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;

            this.alpha -= this.decay;
            
            if (this.alpha <= this.decay) {
                particles.splice(index, 1);
            }
        }

        this.draw = index => {
            context.beginPath();
            context.moveTo(this.coordinates[this.coordinates.length - 1][0],
                           this.coordinates[this.coordinates.length - 1][1]);
            context.lineTo(this.x, this.y);

            context.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
            context.stroke();

            this.animate(index);
        }

        init();
    }
})();
