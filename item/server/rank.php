<?php
  // mysql_query('set names utf8');
  header('Content-type:text/html;charset=utf-8');

  # 先链接数据库
  $db = mysqli_connect("127.0.0.1","root","","meidebi");
  # 连接后解决乱码问题,其中一句都可以
  // mysqli_query($db,'set names utf8');
  $db->query('set names utf8');

  $sql = "SELECT  * FROM rank";

  # 把数据以JSON格式返回
  $result = mysqli_query($db,$sql);
  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);

  echo json_encode($data,true);
?>