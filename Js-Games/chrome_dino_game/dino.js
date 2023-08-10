import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100
const googleDriveImageUrl = "https://drive.google.com/file/d/1Ejc0ATDhOtGCw-fCCxmKcn5SUlfhdOJl/view?usp=sharing";

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = "https://drive.google.com/file/d/1Qz4cMhjx6HW1yRAdQfe7V7mTz2lhV-fn/view?usp=sharing"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `https://drive.google.com/file/d/1PxX20uBjg0adg6k0b-GvAdu-zHzFoar-/view?usp=sharing`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
  
    // <img id="dinoElem" alt="Dino Run"> - This line shouldn't be here.
  
    // One-liner to set the Google Drive image as the source of the dinoElem
    fetch(googleDriveImageUrl).then(res => res.blob()).then(blob => URL.createObjectURL(blob)).then(objectURL => document.getElementById("dinoElem").src = objectURL).catch(error => console.error("Error fetching the image:", error));
  
    currentFrameTime -= FRAME_TIME;
  }
  
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
