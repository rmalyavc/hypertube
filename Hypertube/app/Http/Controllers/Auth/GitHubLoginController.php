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

class GitHubLoginController extends Controller
{
    private $client_id = "f0e6b1255d577c196e1f";
    private $client_secret = "2494ab5b9e85fbae099eb30b4fc26008f8d7d8c1";
    private $redirect_uri = "http://localhost:8000/user/git/auth";
    private $final_redirect = "http://localhost:4200";
    private $v2auth = false;
    private $user;

    public function auth(Request $request)
    {

        $code = $request->toArray()['code'];

        exec ( "curl -F grant_type=authorization_code \
        -H \"Accept: application/json\" \
        -F client_id=$this->client_id \
-F client_secret=$this->client_secret \
-F code=$code \
-F redirect_uri=$this->redirect_uri \
-X POST https://github.com/login/oauth/access_token", $v2auth) ;
//        $v2auth = parse_url($v2auth[0]);
//        return json_encode(json_decode($v2auth[0]));
        $returned = json_decode($v2auth[0]);

        exec("curl -H \"Authorization: Bearer $returned->access_token\" https://api.github.com/user", $user_array);
        $this->user = json_decode(implode($user_array));
//        return print_r($this->user, true);
        $find_user = User::where('social_id', $this->user->id)->where('social_type', "git")->orWhere('email', $this->user->email)->first();
        if (isset($find_user) && !empty($find_user)){
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        } else {
            $user_name = explode(' ', $this->user->name);
            User::create([
                'social_type' => 'git',
                'social_id' => $this->user->id,
                'login' => $this->user->login."_".mt_rand(1, 100000),
                'email' => $this->user->email ? $this->user->email : '',
                'lang' => "EN",
                'first_name' => !empty($user_name[0]) ? $user_name[0] : '',
                'last_name' => !empty($user_name[1]) ? $user_name[1] : '',
                'avatar' => $this->user->avatar_url,
                'user_verified' => true,
            ]);
            $find_user = User::where('social_id', $this->user->id)->where('social_type', "git")->first();
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        }
    }
}
