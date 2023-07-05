<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>We chat</title>
		<link rel="shortcut icon" type="images/x-icon" href="https://drive.google.com/file/d/1nVMGh6ZOE5SvNnyPr6WRI7whEYn7KdwL/view?usp=drive_link" />
		<link rel="stylesheet" type="text/css" href="css/all.css" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
	</head>
	<body>
		<?php
		define('chat',true);
		session_start();
		include_once 'php/config.php';
		if(!isset($_SESSION['unique_id'])){
			header('location:login.php');
		}
		$uniqueId = $_GET['user_id'];
		$sql = mysqli_query($conn,"SELECT * from users where unique_id = {$uniqueId}");
		$row = mysqli_fetch_assoc($sql);
		?>
		<section class="cht_sec">
			<header class="cht_header">
				<a href="user.php">
					<div class="cht_h_icon">
						<i class="fas fa-arrow-left"></i>
					</div>
				</a>
				<img src="<?php echo "images/{$row['img']}"; ?>" alt="error loading
				image" title="<?php echo $row['fname']. " " .$row['lname']; ?>"
				draggable="false" />
				<div class="cht_user">
					<p><?php echo $row['fname']. " " .$row['lname']; ?></p>
					<p><?php echo $row['status']; ?></p>
				</div>
			</header>
			<div class="cht_box"></div>
			<footer class="cht_foot">
				<div class="cht_msg">
					<form class="typing_area" method="POST">
						<input
							type="text"
							name="outgoing_id"
							value="<?php echo $_SESSION['unique_id']?>"
							hidden
						/>
						<input
							type="text"
							name="incoming_id"
							value="<?php echo $uniqueId?>"
							hidden
						/>
						<input
							type="text"
							name="message"
							placeholder="type a message here"
							autofocus
						/>

						<button class="cht_send">
							<i class="fab fa-telegram-plane"></i>
						</button>
					</form>
				</div>
			</footer>
		</section>

		<script type="text/javascript" src="js/all.js"></script>
		<script type="text/javascript">
			const form = document.querySelector('.typing_area');
			const sendBtn = document.querySelector('.cht_send');
			const chtArea = document.querySelector('.cht_box');

			form.onsubmit = (e) => {
				e.preventDefault();
			};
			sendBtn.onclick = () => {
				let xhr = new XMLHttpRequest();
				xhr.onload = () => {};
				xhr.open('POST', 'php/insert-chat.php', true);
				let formData = new FormData(form);
				xhr.send(formData);
				form.reset();
			};

			chtArea.onmouseenter = () => {
				chtArea.classList.add('activa');
			};
			chtArea.onmouseleave = () => {
				chtArea.classList.remove('activa');
			};
			setInterval(() => {
				let xhr = new XMLHttpRequest();
				xhr.onload = () => {
					if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
						let data = xhr.responseText;
						chtArea.innerHTML = data;
						if (!chtArea.classList.contains('activa')) {
							chtArea.scrollTo(0, chtArea.scrollHeight);
						}
					}
				};
				xhr.open('POST', 'php/getdata.php');
				let formData = new FormData(form);
				xhr.send(formData);
			}, 200);
		</script>
	</body>
</html>
