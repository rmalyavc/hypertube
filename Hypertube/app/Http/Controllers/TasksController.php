<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TasksController extends Controller
{
    //
    public function index()
    {
        $users = User::all(["id", "login", "password", "first_name", "last_name", "email"]);

//        return Response::create(["tasks" => json_encode($users)], "200", ['Access-Control-Allow-Origin: *']);
        return json_encode($users);
    }

    public function show($id)
    {
        $users = User::find($id ,["id", "login", "password", "first_name", "last_name", "email"]);
        return json_encode($users);
    }

    public function about($id = null)
    {
        if ($id) {
//          $tasks = DB::table('users')->find($id, ["id", "login", "password", "first_name", "last_name", "email"]);
            $users = User::find($id, ["id", "login", "password", "first_name", "last_name", "email"]);
        } else {
//          $tasks = DB::table('users')->get(["id", "login", "password", "first_name", "last_name", "email"]);
            $users = User::all(["id", "login", "password", "first_name", "last_name", "email"]);
        }
        header('Access-Control-Allow-Origin: *');
        return json_encode($users);
    }
}
