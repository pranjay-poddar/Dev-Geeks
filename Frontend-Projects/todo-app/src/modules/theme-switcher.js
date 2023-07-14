function getCurrentTheme() {
    return localStorage.getItem('todo.theme') === null ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : localStorage.getItem('todo.theme')
}

function loadTheme(theme) {
    document.querySelector(':root').setAttribute('color-scheme', theme)
}

function themeSwitch(theme) {
    const themeBtn = document.querySelector('.header__theme-toggle')
    
    themeBtn.addEventListener('click', (e)=> {
        let audio;

        if (theme === 'dark') {
            theme = 'light';
            e.target.setAttribute('aria-label', theme);
            audio = document.querySelector('.header__switch--on');
        } else {
            theme = 'dark';
            e.target.setAttribute('aria-label', theme);
            audio = document.querySelector('.header__switch--off');
        }
        audio.currentTime = 0;
        audio.play();
        localStorage.setItem('todo.theme', `${theme}`)
        loadTheme(theme);
    })
}

function themeSwitchInitializer() {
    window.addEventListener('DOMContentLoaded', ()=> {
        loadTheme(getCurrentTheme());
    })

    themeSwitch(getCurrentTheme())
}

export {themeSwitchInitializer};