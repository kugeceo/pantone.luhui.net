<?php
if (isset($_FILES['myFile'])) {
    // Example:
    move_uploaded_file($_FILES['myFile']['tmp_name'], "store/" . $_FILES['myFile']['name']);
    echo 'successful';
}
?>