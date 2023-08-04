const input = document.getElementById('email')
const submitBtn = document.getElementById('submit-btn')
const errorMsg = document.getElementById('error-msg')
const container = document.getElementById('container')
const successMsgContainer = document.getElementById('success-msg-container')
const successEmail = document.getElementById('success-email')

submitBtn.addEventListener('click', () =>{
    ValidateEmail(input)
})

function ValidateEmail(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        successEmail.innerHTML = inputText.value;

        input.classList.remove('error-state');
        errorMsg.classList.remove('show');
        successMsgContainer.classList.add('show');
        successMsgContainer.classList.remove('hide');
        container.classList.add('hide');
        container.classList.remove('show');
        return true;
    }
    else {
        input.classList.add('error-state');
        errorMsg.classList.add('show');
        successMsgContainer.classList.remove('show');
        successMsgContainer.classList.add('hide');
        container.classList.remove('hide');
        container.classList.add('show');
        return false;
    }
}