import {animationConfiguration} from "./core/AnimationConfiguration.js";
import {animate} from "./core/animation/animate.js";

//To run: install node
//from terminal in correct directory
//node 'src/index.js'
for (let i = 0; i < 5; i++) {
    console.log("started process");
    const config = new animationConfiguration();
    await animate(config);
    console.log("completed process");
}


