const keys = document.querySelectorAll('.key');
const regulars = document.querySelectorAll('.key.white');
const sharps = document.querySelectorAll('.key.black');
const whites = ['z', 'x', 'c', 'v', 'n', 'a', 'q'];
const blacks = ['s', 'd', 'b', 'g', 'f']

keys.forEach((key) => {
    key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key
    const whiteKeyIndex = whites.indexOf(key)
    const blackKeyIndex = blacks.indexOf(key)

    if (whiteKeyIndex > -1) playNote(regulars[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(sharps[blackKeyIndex])
})

let playNote = (key) => {
    const noteSound = document.getElementById(key.dataset.note)
    noteSound.currentTime = 0
    noteSound.play()
    key.classList.add('active')
    noteSound.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}