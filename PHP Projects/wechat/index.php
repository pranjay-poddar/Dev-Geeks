<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/all.css" />
		<link rel="shortcut icon" type="images/x-icon" href="https://drive.google.com/file/d/1nVMGh6ZOE5SvNnyPr6WRI7whEYn7KdwL/view?usp=drive_link" />
		<title>We chat</title>
	</head>
	<body>
		<?php define('chat',true); ?>
		<section class="wrapper">
			<header>Welcome to We chat</header>
			<form
				class="form_details"
				autocomplete
				method="POST"
				enctype="multipart/form-data"
			>
				<div class="err_content">
					<i class="fa-solid fa-circle-exclamation err_icon"></i>
					<div class="err_text">
						<h4>error</h4>
						<p>this is a error message</p>
					</div>
				</div>
				<div class="name_details">
					<div class="field">
						<label for="fname">First Name: </label>
						<input
							type="text"
							placeholder="First Name"
							id="fname"
							name="fname"
							autofocus
							required
						/>
					</div>
					<div class="field">
						<label for="lname">Last Name: </label>
						<input
							type="text"
							placeholder="Last Name"
							id="lname"
							required
							name="lname"
						/>
					</div>
				</div>
				<div class="field">
					<label for="email">Email address: </label>
					<input
						type="email"
						placeholder="enter your email"
						id="email"
						required
						name="email"
					/>
				</div>
				<div class="field">
					<label for="password">Password: </label>
					<div class="pswrd_content">
						<input
							type="password"
							placeholder="Enter new Password"
							id="password"
							required
							name="password"
						/>
						<i class="fa-solid fa-eye pswrd_icon_btn" onclick="pswrd_togg(this)"></i>
					</div>
				</div>
				<div class="field">
					<label for="image">Select image </label>
					<input type="file" id="image" name="image" required />
				</div>
				<div class="field">
					<input type="submit" value="continue to chat" />
				</div>
				<div class="auth field">
					<p>Already signed up?</p>
					<button
						type="button"
						class="auth_btn"
						onclick="location.href='login.php'"
					>
						<span>Login in</span>
					</button>
				</div>
			</form>
		</section>
		<script type="text/javascript" src="js/all.js"></script>
		<script type="text/javascript">
			const pswrd = document.querySelector('#password');
			const form = document.querySelector('form.form_details');
			const continueBtn = form.querySelector(".field input[type='submit']");
			const errorText = form.querySelector('.err_content .err_text p');
			const errBlock = form.querySelector('.err_content');
			form.onsubmit = (e) => {
				e.preventDefault();
			};
			continueBtn.onclick = () => {
				let xhr = new XMLHttpRequest();
				xhr.onload = () => {
					if (
						xhr.readyState === XMLHttpRequest.DONE &&
						xhr.status === 200
					) {
						let data = xhr.responseText;
						if (data == 'success') {
							location.href = 'user.php';
						} else {
							errorText.textContent = data;
							errBlock.style.display = 'inline-flex';
						}
					}
				};
				xhr.open('POST', 'php/signup.php', true);
				let formData = new FormData(form);
				xhr.send(formData);
			};
			function pswrd_togg(e){
				e.classList.toggle('fa-eye');
				e.classList.toggle('fa-eye-slash');
				if(e.classList.contains('fa-eye')){
					pswrd.type = 'password';
				}else{
					pswrd.type = 'text';
				}
			}

		</script>
	</body>
</html>
