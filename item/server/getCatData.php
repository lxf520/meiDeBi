<?php
  header('Content-type:text/html;charset=utf-8');

$con = mysqli_connect("127.0.0.1", "root", "", "meidebi");

$con->query('set names utf8');

$sql = "SELECT * FROM car";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>