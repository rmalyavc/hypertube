<?php


namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Http\Controllers\LoggedUsersController;
use Illuminate\Http\Request;
use App\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use mysql_xdevapi\Exception;
use function Psy\debug;

class GoogleLoginController extends Controller
{
    private $client_id = "836984456371-tt1meo6k2gso4jdo95nnk5noie4ubpmb.apps.googleusercontent.com";
    private $client_secret = "t-Fg20V7pj5LtYPz-Eu3Cbx8";
    private $redirect_uri = "http://localhost:8000/user/google/auth";
    private $final_redirect = "http://localhost:4200";
    private $v2auth = false;
    private $user;

    public function auth(Request $request)
    {

        $code = $request->toArray()['code'];
//        return json_encode($request->toArray());
        exec ( "curl -F grant_type=authorization_code \
        -H \"Accept: application/json\" \
        -F client_id=$this->client_id \
-F client_secret=$this->client_secret \
-F code=$code \
-F redirect_uri=$this->redirect_uri \
-X POST https://www.googleapis.com/oauth2/v4/token", $v2auth) ;

//        return json_encode($v2auth);

        $returned = json_decode(implode($v2auth));
//        return json_encode($returned);
//
        exec("curl -H \"Authorization: Bearer $returned->access_token\" https://www.googleapis.com/oauth2/v1/userinfo?", $user_array);
        $this->user = json_decode(implode($user_array));
//        return print_r($this->user, true);
        $find_user = User::where('social_id', $this->user->id)->where('social_type', "google")->orWhere('email', $this->user->email)->first();
        if (isset($find_user) && !empty($find_user)){
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        } else {
            $user_name = explode(' ', $this->user->name);
            User::create([
                'social_type' => 'google',
                'social_id' => $this->user->id,
                'login' => str_replace(' ', '_', $this->user->name)."_".mt_rand(1, 100000),
                'email' => $this->user->email ? $this->user->email : '',
                'lang' => in_array( strtoupper($this->user->locale), ["EN", "RU"]) ?  strtoupper($this->user->locale) : "EN",
                'first_name' => !empty($this->user->given_name) ? $this->user->given_name : '',
                'last_name' => !empty($this->user->family_name) ? $this->user->family_name : '',
                'avatar' => $this->user->picture,
                'user_verified' => $this->user->verified_email,
            ]);
            $find_user = User::where('social_id', $this->user->id)->where('social_type', "google")->first();
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        }
    }
}
