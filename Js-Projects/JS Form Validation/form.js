const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const phone=document.getElementById('phone');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
    });


function checkInputs(){
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

//username 
  if( usernameValue === ''){
    setErrorFor(username, 'Username cannot be blank');
  } 
  
  else if(usernameValue.length<=4){
    setErrorFor(username, 'Username minimum 5 character ');
  }

  else {
   setSuccessFor(username);
  }

  //email

  if(emailValue === ''){
     setErrorFor(email, 'Email cannot be blank');
  }
  else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} 
  else{
    setSuccessFor(email);
  }


 //phone number
 if(phoneValue === ''){
   setErrorFor(phone, 'Phone no. cannot be blank');
 }
 else if(phoneValue.length != 10){
setErrorFor(phone,'Not a valid Phone no ');
 }
 else{
   setSuccessFor(phone);
 }

  //password
  	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	  } 

    else if(passwordValue.length<=8){
       setErrorFor(password,'Minimum 8 characters required')
    }
  else {
		setSuccessFor(password);
	}

  //confirm password

  if(password2Value === ''){
    setErrorFor(password2, 'Please confirm your password');
  }
  else if(passwordValue != password2Value){
    setErrorFor(password2, 'Passwords does not match');
  }
  else{
    setSuccessFor(password2);
  }

  

}

function setErrorFor(input, message){
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
   small.innerText = message;
   formControl.className = 'form-control error';
}

function setSuccessFor(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


