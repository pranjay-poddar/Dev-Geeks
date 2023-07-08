<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>We chat</title>
		<link rel="stylesheet" type="text/css" href="css/all.css" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="shortcut icon" type="images/x-icon" href="https://drive.google.com/file/d/1nVMGh6ZOE5SvNnyPr6WRI7whEYn7KdwL/view?usp=drive_link" />
	</head>
	<body>
		<?php
		define('chat',true);
		session_start();
		if(!isset($_SESSION['unique_id'])){
			header('location:login.php');
		}
		include_once 'php/config.php';

			$sql = mysqli_query($conn,"SELECT * FROM users WHERE unique_id = {$_SESSION['unique_id']}");
			if(mysqli_num_rows($sql)){
				$row = mysqli_fetch_assoc($sql);
			}
		?>
		<section class="user_section">
			<header class="user_header">
				<div class="user_details">
					<img src="<?php echo "images/{$row['img']}"; ?>" alt="error
					loading image" title="<?php echo $row['fname']. " " .$row['lname']; ?>"
					/>
					<div class="user_content">
						<p><?php echo $row['fname']. " " .$row['lname']; ?></p>
						<p><?php echo $row['status']; ?></p>
					</div>
				</div>

				<button class="auth_btn" style="font-size: 0.9rem" onclick="location.href ='php/logout.php' ">logout</button>
			</header>
			<div class="field">
				<div class="search_box">
					<span>Select an user to start chat</span>
					<input
						type="text "
						class="hidden"
						placeholder="Enter name to search"
					/>
				</div>
				<button class="search_icon"><i class="fas fa-search"></i></button>
			</div>
			<div class="users_list"></div>
		</section>

		<script type="text/javascript" src="js/all.js"></script>
		<script type="text/javascript">
			const searchIcon = document.querySelector('.search_icon');
			const searchText = document.querySelector(
				'.user_section .field span'
			);
			const searchBar = document.querySelector(
				'.user_section .field input'
			);
			const userList = document.querySelector('.user_section .users_list');

			searchIcon.addEventListener('click', () => {
				searchText.classList.toggle('hidden');
				searchBar.classList.toggle('hidden');
				searchBar.focus();
			});
			searchBar.onkeyup = () => {
				searchItem = searchBar.value;
				if (searchItem != '') {
					searchBar.classList.add('active');
				} else {
					searchBar.classList.remove('active');
				}
				let xhr = new XMLHttpRequest();
				xhr.onload = () => {
					if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
						let data = xhr.responseText;
						userList.innerHTML = data;
					}
				};
				xhr.open('POST', 'php/search.php', true);
				xhr.setRequestHeader(
					'Content-type',
					'application/x-www-form-urlencoded'
				);
				xhr.send('search=' + searchItem);
			};

			setInterval(() => {
				let xhr = new XMLHttpRequest();
				xhr.onload = () => {
					if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
						let data = xhr.responseText;
						if (!searchBar.classList.contains('active')) {
							userList.innerHTML = data;
						}
					}
				};
				xhr.open('POST', 'php/user.php', true);
				xhr.send();
			}, 500);
		</script>
	</body>
</html>
