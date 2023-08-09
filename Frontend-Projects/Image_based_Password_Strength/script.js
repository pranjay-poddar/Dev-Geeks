const password = document.getElementById('password')
const background = document.getElementById('background')

password.addEventListener('input', (e) => {
  const input = e.target.value
  const length = input.length
  const blurValue = 20 - length * 2 // blur is only defined on length for simplicity. 
  // I wish to add a challenge to it. Make it such that symbols contribute 2x clarity vs other characters.

  // applying blur to background
  background.style.filter = `blur(${blurValue}px)`
})
