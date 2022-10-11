import {getRandomIntInclusive} from "../../../../core/math/random.js";
import {glitchFractalEffect} from "./effect.js";

const config = {
    theRandom: {lower: 5, upper: 10},
    glitchChance: 100,
}

export const generate = () => {

    const data = {
        glitchChance: config.glitchChance,
        theRandom: getRandomIntInclusive(config.theRandom.lower, config.theRandom.upper),
        getInfo: () => {
            return `${glitchFractalEffect.name} ${data.glitchChance} chance, random: ${data.theRandom}`
        }
    }
    return data;
}