<?php


namespace App\Http\Controllers;


use DateTime;

class ErrorManager
{
    public static function logError($message){
        file_put_contents("Error.log", (new DateTime())->format('Y-m-d H:i:s').": $message at ".__FILE__.PHP_EOL, FILE_APPEND);
    }
}