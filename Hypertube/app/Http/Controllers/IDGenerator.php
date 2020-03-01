<?php


namespace App\Http\Controllers;


class IDGenerator
{
    public static function unique_id()
    {
       return base_convert(sha1(uniqid(mt_rand(), true)), 16, 36);
    }
}
