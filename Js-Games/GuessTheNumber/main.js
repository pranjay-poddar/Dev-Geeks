

let score_text = document.getElementById("score");
let chance_text = document.getElementById("chance");
let alert_empty = document.getElementsByClassName
let user_number = document.getElementById("enter-numer");
const guess_btn = document.querySelector(".btn")
let btn_yes_no = document.getElementsByClassName("button-y-n")
let yes_btn = document.getElementById('yes-btn');
let no_btn = document.getElementById('no-btn')
let overlay = document.querySelector(".overlay")

// music-section
let game_music = document.querySelector('#game-music');
game_music.volume = 0.3;
game_music.loop = true;

let warn_beep = document.querySelector('#warn-music');
warn_beep.loop = false;

let wrong_ans = document.querySelector('#wrong-ans');
wrong_ans.loop = false;

let correct_ans = document.querySelector('#correct-ans');
correct_ans.loop = false

let game_end = document.querySelector('#game_over');
game_end.loop = false;
//
let random_number = Math.floor(Math.random() * 100) + 1;
console.log(random_number);
console.log(typeof random_number);
let chance = 10, score = 100;

user_number.addEventListener('click', function () {
      game_music.play();
})


const set_value = (chance, score) => {
      score_text.innerText = `Score = ${score}`;
      chance_text.innerText = `${chance}`;
      user_number.value = ""
}
const close_popUp = (over, overlay, add_class) => {
      console.log(add_class);
      over.classList.remove(add_class);
      overlay.classList.remove('overlay-active');
}
const open_popUp = (over, overlay, add_class) => {
      game_music.pause();
      game_music.currentTime = 0
      console.log(add_class);
      over.classList.add(add_class);
      overlay.classList.add('overlay-active');

      console.log(yes_btn)
      yes_btn.addEventListener('click', function () {
            game_music.currentTime = 0
            game_music.play();
            reset_game();
            close_popUp(over, overlay, add_class);
      })

      console.log(no_btn)
      no_btn.addEventListener('click', function () {
            game_music.pause();
            game_music.currentTime = 0
            close_popUp(over, overlay, add_class);
            set_value(chance, score);
      })
}

const game_play = (num) => {
      console.log(num, random_number);
      if (num === random_number) {
            let add_class_congrats = "congrats-active"
            let congrats = document.querySelector('.congratulation');
            open_popUp(congrats, overlay, add_class_congrats)
            correct_ans.play();
            let y_btn = document.querySelector('#yesh-btn');
            let n_btn = document.querySelector('#noo-btn');
            document.querySelector('#final-score').innerText = `FINAL SCORE : ${score}`;
            y_btn.addEventListener('click', function () {
                  game_music.currentTime = 0
                  game_music.play();
                  reset_game();
                  close_popUp(congrats, overlay, add_class_congrats);
            })
            n_btn.addEventListener('click', function () {
                  close_popUp(congrats, overlay, add_class_congrats);
                  reset_game()
            })
            correct_ans.currentTime = 0;
      }
      else if (num != random_number) {
            if(chance!=1)
            wrong_ans.play();
            document.querySelector('.hint-box').classList.add('hint-box-active');
            if (num > random_number)
                  document.querySelector('.hint').innerText = `The number is less than ${num}.\nTry agin!`
            else
                  document.querySelector('.hint').innerText = `The number is greater than ${num}.\nTry agin!`
            chance--;
            score -= 10;
            wrong_ans.currentTime = 0;
      }
      const myTimeout = setTimeout(hint_box_hide, 8000);
      function hint_box_hide() {
            document.querySelector('.hint-box').classList.remove('hint-box-active');
      }
      set_value(chance, score);

}
const reset_game = () => {
      random_number = Math.floor(Math.random() * 100) + 1;
      console.log(random_number);
      chance = 10, score = 100;

      document.querySelector('.final-score').innerText = `FINAL SCORE : `
      document.querySelector('.hint-box').classList.remove('hint-box-active');
      set_value(chance, score);
}
const warning_prompt_close = (warning_mode) => {
      warning_mode.classList.remove('warning-active');
      overlay.classList.remove('overlay-active')
}
const warning_prompt_open = () => {
      warn_beep.play();
      let warning_mode = document.querySelector(".warning");
      let warning_close_btn = document.querySelector("#warning-ok");
      document.querySelector(".number-error").innerText = "Your guss is out of the range ‼, enter number within valid range."
      warning_mode.classList.add('warning-active');
      overlay.classList.add('overlay-active');
      warning_close_btn.addEventListener('click', function () {
            warn_beep.currentTime = 0;
            warning_prompt_close(warning_mode);
      })
}
guess_btn.addEventListener('click', function () {
      // game_music.play();
      if (chance) {
            let user_number = document.getElementById("enter-numer");
            if (user_number.value == "") {
                  user_number.style.borderColor = "red";
                  document.querySelector(".alert").classList.add("alert-active");
            }
            else {
                  let num = Number.parseInt(user_number.value);
                  console.log(typeof num);
                  if (num < 1 || num > 100 || isNaN(num))
                        warning_prompt_open();
                  else
                        game_play(num);
                  user_number.style.borderColor = "whitesmoke";
                  document.querySelector(".alert").classList.remove("alert-active");
            }
            if (chance == 0) {
                  let add_class_game_over = "game-over-active";
                  let game_over = document.querySelector(".game-over")
                  document.querySelector('.final-score').innerText = `FINAL SCORE : ${score}`
                  open_popUp(game_over, overlay, add_class_game_over);
                  game_end.play();
                  document.querySelector('.result').innerText = `Number : ${random_number} 😁`
                  game_end.currentTime = 0;
            }
      }
      else {
            console.log("IN 0");
            let add_class_game_over = "game-over-active";
            let game_over = document.querySelector(".game-over")
            open_popUp(game_over, overlay, add_class_game_over);
            game_end.play();
            game_end.currentTime = 0;
      }

})
