<?php
  header('Content-type:text/html;charset=utf-8');

$con = mysqli_connect("127.0.0.1", "root", "", "meidebi");

$con->query('set names utf8');

$goodid = $_REQUEST["goodid"];
$check = $_REQUEST["status"];

// $sql = "SELECT * FROM  car WHERE goodid = '$goodid'";
// $result = mysqli_query($con,$sql);
echo $check;

$updateSql = "UPDATE car SET isActive='$check' WHERE goodid='$goodid'";
$result = mysqli_query($con, $updateSql);


$sql = "SELECT * FROM car";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>