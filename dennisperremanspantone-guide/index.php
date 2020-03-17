<?php
	// Get array of Pantone data from json file
	$pantone_json = file_get_contents('src/js/colors.json');
	$pantone = json_decode($pantone_json,true);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>
		Pantone color guide
	</title>
	
	<script src="https://use.fontawesome.com/6cd3b02210.js"></script>

	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="dist/style.css">
</head>
<body>
<header class="primary-header">
	<h1>Pantone guide</h1>

	<input class="input input--search" placeholder="Search pms, rgb, cmyk or hex" />
</header>

<main class="list flex-grid" id="list">
	<?php
	// iterate through data array and output each item formatted
	foreach ($pantone as $key => $value) {
	    // add "Pantone" to beginning of Code title if just a number
	    if (ctype_digit(substr($value["Code"], 0, 3))) {
	        $pantone_title = "Pantone " . $value["Code"];
	    } else {
	        $pantone_title = $value["Code"];
	    }
	?>
		<div class="swatch" style="background-color: <?php echo $value['Hex']; ?>; color:#000000;">
			<div class="swatch__content">
				<span class="swatch__code">
					<? echo $value["Code"]; ?>
				</span>
				<span class="swatch__rgb">
					<? echo $value["R"] .', '. $value["G"] .', '. $value["B"]; ?>
				</span>
				<span class="swatch__cmyk">
					<? echo $value["C"] .', '. $value["M"] .', '. $value["Y"].', '. $value["K"]; ?>
				</span>
				<span class="swatch__hex">
					<? echo $value["Hex"]; ?>
				</span>
			</div>
		</div>

	<?php
	}
	?>
</main>

<footer class="primary-footer">
	Pantone guide - PANTONE® and other Pantone, Inc. trademarks are the property of Pantone, Inc.
</footer>

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="src/js/app.js"></script>
</body>
</html>