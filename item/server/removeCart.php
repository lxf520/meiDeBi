<?php

header('Content-type:text/html;charset=utf-8');

$con = mysqli_connect("127.0.0.1", "root", "", "meidebi");

$con->query('set names utf8');


$goodid = $_REQUEST["goodid"];
$sql = "DELETE FROM car  WHERE goodid='$goodid'";
$result = mysqli_query($con, $sql);


$sql = "SELECT * FROM car";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);
?>