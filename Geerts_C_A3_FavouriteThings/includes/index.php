<?php
    include("connect.php");
    include("functions.php");

    // if we need one piece, run a getOne function

    // else get all the pieces

    if(isset($_GET["id"])) {
        // get one from the database - whichever one you clicked on and asked for in the UI
        $targetID = $_GET["id"];
        $result = getSingleUser($pdo, $targetID);
    } else {
        // user must want to see all items in the database
        // var_dump($pdo);

        $result = getAllUsers($pdo);
    }

//     function getSingleUser($conn, $id) {
//         $query = "SELECT * FROM db_favthings WHERE";

//        $runQuery = $pdo->query($query);

//        $result = array();

//        while($row = $runQuery->fetchAll(PDO::FETCH_ASSOC)) {
//            $result[] = $row;
//    }

       //return $result;
    //    echo(json_encode($result));
   