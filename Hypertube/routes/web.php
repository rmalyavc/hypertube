<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//use \Illuminate\Foundation\Auth\User;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/users', function () {
//    $tasks = DB::table('users')->get(["id", "login", "password", "first_name", "last_name", "email"]);
//    header('Access-Control-Allow-Origin: *');
//    return json_encode($tasks);
//});

//Route::get('/users/{id?}', function ($id = null) {
//    if ($id) {
////        $tasks = DB::table('users')->find($id, ["id", "login", "password", "first_name", "last_name", "email"]);
//        $users = App\User::find($id, ["id", "login", "password", "first_name", "last_name", "email"]);
//    } else {
////        $tasks = DB::table('users')->get(["id", "login", "password", "first_name", "last_name", "email"]);
//        $users = App\User::all(["id", "login", "password", "first_name", "last_name", "email"]);
//    }
//    header('Access-Control-Allow-Origin: *');
//    return json_encode($users);
//})->where(['id' => "[0-9]+"]);

//Route::get('/tasks', "TasksController@index");
//Route::get('/tasks/{id}', "TasksController@show")->where(['id' => "[0-9]+"]);

Route::get('/tasks/{id?}', "TasksController@about");

Route::group([], function (){
    Route::get('login', 'Auth\LoginController@login')->name('login');
    Route::post('login', 'Auth\LoginController@login');
    Route::get('logout', 'Auth\LoginController@logout')->name('logout');
    Route::post('/user/password/forgot', "RecoverPasswordController@forgot_password");
    Route::get('/user/recover/checkLink', "RecoverPasswordController@check_link");
    Route::post('/user/password/recover', "RecoverPasswordController@recover_password");
    Route::get('getUserStatus', 'UserController@getUserStatus');

});

Route::group(['middleware' => ['token.verify']], function (){
    Route::post("/user/update", "UserController@updateUserRecord");
    Route::get("/user/history/movies/{limit?}", "UserController@getUserMovieHistory")->where(['limit' => "[0-9]+"]);
    Route::post("/user/history/addMovie", "UserController@addUserMovieHistory");
    Route::get("/user/profile/{login?}", "UserController@getUserData");
    Route::post("/user/update/image", "UserController@userUpdateImage");
    Route::post("/user/password/change", "UserController@changePassword");
    Route::get('/user/notifications', 'NotificationController@get_notifications');
    Route::get('/user/notification/clear', 'NotificationController@clear_notification');
});

Route::group(['middleware' => ['token.verify']], function (){
    Route::get("movie/get/comments", "CommentsController@getComments");
    Route::post("movie/set/comment", "CommentsController@setComment");
    Route::post("movie/delete/comment", "CommentsController@deleteComment");
    Route::post("movie/edit/comment", "CommentsController@editComment");
    Route::get("/user/suggest_login", "CommentsController@parse_logins");
});

Route::get('/home', 'HomeController@index')->name('home');

Route::group([],
    function () {
        Route::get('/notification/unsubscribe/{uid?}', "UserController@email_unsubscribe");
        Route::get("/register", "Auth\RegisterController@register");
        Route::post("/register", "Auth\RegisterController@register");
        Route::get("/user/verify/{token?}", "UserVerifyController@verify");
        Route::get("/user/42/auth", "Auth\IntraLoginController@auth");
        Route::get("/user/git/auth", "Auth\GitHubLoginController@auth");
        Route::get("/user/google/auth", "Auth\GoogleLoginController@auth");
    });

Route::group([],
    function() {
    Route::get("/mail/send", "EmailController@testEmail");
    Route::get('/movie/get/expired', "MoviesController@getExpiredMovies");
    Route::get('/test', 'NotificationController@test_set_notify');
});
