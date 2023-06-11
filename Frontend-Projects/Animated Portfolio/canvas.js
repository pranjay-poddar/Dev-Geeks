const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colorsCombo2 = ['#e5243f','#f65c51','#f7b15c','#54c6be','#2f5755']; // muted original
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']; // other colors

// Event Listeners
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    location.reload()
})



// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random() - 0.5)*3,
            y: (Math.random() - 0.5) *3
        }
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.opacity = 0;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update(particles) {
        this.draw();

        for(let i=0; i< particles.length; i++) {
            if(this === particles[i]) {
                continue;
            }
            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius*2 < 0) {
                resolveCollision(this,particles[i]);
                [this.color, particles[i].color] = [particles[i].color, this.color];
            }
        }
        // Horizontal Boundary Collision
        if(this.x-this.radius <= 0 || this.radius+this.x >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }
        // Vertical Boundary Collision
        if(this.y-this.radius <= 0 || this.radius+this.y >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
    }
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function randomNumRange(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

/**
 * returns distance between 2 points coordinates (x1,y1) and (x2,y2)
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) );
}

// Implementation
let particles = [];

function init() {
    for(let i=0; i<100; i++) {
        let radius = 20;
        let x = randomNumRange(radius*2, canvas.width-radius*2);
        // let y = Math.random()*innerHeight;
        let y = randomNumRange(radius*2, canvas.height-radius*2);
        let idx = Math.floor(Math.random() * colorsCombo2.length);
        let color = colorsCombo2[idx];
        // making sure that particles are not over lapping
        if(i != 0) {
            for(let j=0; j<particles.length; j++) {
                if( distance(x, y, particles[j].x, particles[j].y) - radius*2 < 0) {
                    x = randomNumRange(radius*2, canvas.width-radius*2);
                    // y = Math.random()*innerWidth;
                    y = randomNumRange(radius*2, canvas.width-radius*2);
                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#000000'; // Canvas Background color
    c.fill();
    particles.forEach(particle => {
        particle.update(particles);
    });
  
}

init()
animate()