let count_1 = 0;
let count_2 = 0;
let home_result = document.getElementById("score_1");
let guest_result = document.getElementById("score_2");

function res1_1() {
    count_1 += 1;
    home_result.textContent = count_1;
}
function res1_2() {
    count_1 += 2;
    home_result.textContent = count_1;
}
function res1_3() {
    count_1 += 3;
    home_result.textContent = count_1;
}

function res2_1() {
    count_2 += 1;
    guest_result.textContent = count_2;
}
function res2_2() {
    count_2 += 2;
    guest_result.textContent = count_2;
}
function res2_3() {
    count_2 += 3;
    guest_result.textContent = count_2;
}
function reset(){
    count_1=0;
    count_2=0;
    home_result.textContent = count_1;
    guest_result.textContent = count_2;


}