<?php require("libs/fetch_data.php");?>
<?php
define("ROW_PER_PAGE",6);
require_once('database/db.php');//db config file
?>
<!DOCTYPE html>
<html lang="zxx">
<head>
	<title>Search|<?php getwebname("titles"); echo"|"; gettagline("titles");?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link id="browser_favicon" rel="shortcut icon" href="blogadmin/images/<?php geticon("titles"); ?>">
	<meta charset="utf-8" name="description" content="<?php getshortdescription("titles");?>">
	<meta name="keywords" content="<?php getkeywords("titles");?>" />
<script>
		addEventListener("load", function () {
			setTimeout(hideURLbar, 0);
		}, false);

		function hideURLbar() {
			window.scrollTo(0, 1);
		}
	</script>
	<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="css/single.css">
	<link href="css/style.css" rel='stylesheet' type='text/css' />
	<link href="css/fontawesome-all.css" rel="stylesheet">
	<link href="//fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800"
	    rel="stylesheet">
</head>

<body>
	<!--Header-->
	<?php include("header.php");?>
	<!--//header-->
	<?php	
    $search_keyword = '';
    if(!empty($_POST['search']['keyword'])) {
    	$search_keyword = $_POST['search']['keyword'];
    }
    $sql = 'SELECT * FROM blogs WHERE title LIKE :keyword OR content LIKE :keyword  OR tags LIKE :keyword OR author LIKE :keyword ORDER BY id DESC ';
    
    /* Pagination Code starts */
    $per_page_html = '';
    $page = 1;
    $start=0;
    if(!empty($_POST["page"])) {
    	$page = $_POST["page"];
    	$start=($page-1) * ROW_PER_PAGE;
    }
    $limit=" limit " . $start . "," . ROW_PER_PAGE;
    $pagination_statement = $pdo_conn->prepare($sql);
    $pagination_statement->bindValue(':keyword', '%' . $search_keyword . '%', PDO::PARAM_STR);
    $pagination_statement->execute();

    $row_count = $pagination_statement->rowCount();
    if(!empty($row_count)){
    	$per_page_html .= "<div style='text-align:center;margin:20px 0px;'>";
    	$page_count=ceil($row_count/ROW_PER_PAGE);
    	if($page_count>1) {
    		for($i=1;$i<=$page_count;$i++){
    			if($i==$page){
    				$per_page_html .= '<input type="submit" name="page" value="' . $i . '" class="btn-page current btn-warning" />';
    			} else {
    				$per_page_html .= '<input type="submit" name="page" value="' . $i . '" class="btn-page btn-danger" />';
    			}
    		}
    	}
    	$per_page_html .= "</div>";
    }

    $query = $sql.$limit;
    $pdo_statement = $pdo_conn->prepare($query);
    $pdo_statement->bindValue(':keyword', '%' . $search_keyword . '%', PDO::PARAM_STR);
    $pdo_statement->execute();
    $result = $pdo_statement->fetchAll();
    ?>
	<!--/banner-->
	<div class="banner-inner">
	</div>
	<ol class="breadcrumb">
		<li class="breadcrumb-item">
			<a href="index.html">Home</a>
		</li>
		<li class="breadcrumb-item active">Search</li>
	</ol>
	<!--//banner-->
	<!--/main-->
	<section class="main-content-w3layouts-agileits">
		<div class="container">
			<h3 class="tittle">Search Results</h3>
			<div class="inner-sec">
				<?php  if ($row_count==0) {
		# code...
    						echo "<p style=color:#E9573F><b>sorry your search for:<u style=color:black>$search_keyword</u> returned zero results</b></p>";
    						echo "<p><b style=color:#4FC1E9>Suggestions<b><br>Your search item is not available on Our Website<br>Try being more specific with key words<br>Enter key word using title<br>Try search using category<br>Try again later<br></p>";
    						echo "<p><a href=\"http://www.google.com/search?q=" 
    						. $search_keyword . "\" target=\"_blank\" title=\"Look up 
    						" . $search_keyword . " on Google\" style=color:#37BC9B>Click here</a> to try the 
    						search on google</p>";
    					}
    					else{
    						echo "<p style=color:#4FC1E9><b>you searched for:<u style=color:black> $search_keyword</u></b></p>";
    						echo "<p style=color:#37BC9B><b>Results($row_count)..</b></p>";
    					}
    					?>
				<!--left-->
				<div class="left-blog-info-w3layouts-agileits text-left">
					<div class="row">
						<?php
    					if(!empty($result)) { 
    						foreach($result as $row) {
                                ?>
						<div class="col-lg-4 card">
							<a href="single.php?id=<?php echo $row['id']; ?>">
								<img src="blogadmin/images/<?php echo $row['photo']; ?>" class="card-img-top img-fluid" alt="fantastic cms" style="width: 480px;height: 300px">
							</a>
							<div class="card-body">
								<ul class="blog-icons my-4">
									<li>
										<a href="#">
											<i class="far fa-calendar-alt"></i> <?php echo $row['date']; ?></a>
									</li>
									<li class="mx-2">
										<a href="#">
											<i class="far fa-user"></i><?php echo $row['author']; ?></a>
									</li>
									<li>
										<a href="#">
											<i class="fas fa-tags"></i><?php echo $row['tags']; ?></a>
									</li>

								</ul>
								<h5 class="card-title">
									<a href="single.php?id=<?php echo $row['id']; ?>"><?php echo $row['title']; ?></a>
								</h5>
								<a href="single.php?id=<?php echo $row['id']; ?>" class="btn btn-primary read-m">Read More</a>
							</div>
						</div>
						<?php
                                  }
                              }
                              ?>
                              
                              <?php echo $per_page_html; ?>
					</div>
					<!--//left-->
				</div>
			</div>
		</div>
	</section>
	<!--//main-->
	<!--footer-->
	<?php include("footer.php") ?>
	<!---->

	<!-- js -->
	<script src="js/jquery-2.2.3.min.js"></script>
	<!-- //js -->
	<!--/ start-smoth-scrolling -->
	<script src="js/move-top.js"></script>
	<script src="js/easing.js"></script>
	<script>
		jQuery(document).ready(function ($) {
			$(".scroll").click(function (event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top
				}, 900);
			});
		});
	</script>
	<!--// end-smoth-scrolling -->

	<script>
		$(document).ready(function () {
			/*
									var defaults = {
							  			containerID: 'toTop', // fading element id
										containerHoverID: 'toTopHover', // fading element hover id
										scrollSpeed: 1200,
										easingType: 'linear' 
							 		};
									*/

			$().UItoTop({
				easingType: 'easeOutQuart'
			});

		});
	</script>
	<a href="#home" class="scroll" id="toTop" style="display: block;">
		<span id="toTopHover" style="opacity: 1;"> </span>
	</a>

	<!-- //Custom-JavaScript-File-Links -->
	<script src="js/bootstrap.js"></script>


</body>

</html>