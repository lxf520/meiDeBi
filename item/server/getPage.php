<?php
header('Content-type:text/html;charset=utf-8');
# 先链接数据库
$db = mysqli_connect("127.0.0.1","root","","meidebi");

# 写sql语句查询数据库中的数据
$sql = "SELECT * FROM shopinfo";

$result = mysqli_query($db,$sql);
$size = mysqli_num_rows($result);

$count = ceil($size / 20);

$data = array("count"=>$count);
echo json_encode($data,true);

?>