<?php
  // mysql_query('set names utf8');
  header('Content-type:text/html;charset=utf-8');

  # 先链接数据库
  $db = mysqli_connect("127.0.0.1","root","","meidebi");
  # 连接后解决乱码问题,其中一句都可以
  // mysqli_query($db,'set names utf8');
  $db->query('set names utf8');

  # 编写SQL语句查询数据库中的数据
  # 第一页 0
  # 第二页 20
  # 第三页 40
  # 第N页  (n-1) * 20
  $page = $_REQUEST["page"];
  $start = ($page - 1) * 20; 

  $type = $_REQUEST["type"];
  if($type == "default")
  {
    $sql = "SELECT  * FROM shopinfo LIMIT $start,20";
  }elseif($type == "dsc")
  {
    $sql = "SELECT  * FROM shopinfo ORDER BY price DESC LIMIT $start,20";
  }elseif($type == "asc"){
    $sql = "SELECT  * FROM shopinfo ORDER BY nice desc LIMIT $start,20";
  }


  # 把数据以JSON格式返回
  $result = mysqli_query($db,$sql);
  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);

  echo json_encode($data,true);
?>