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

class IntraLoginController extends Controller
{
    private $client_id = "b7b682799d4496b76ffcd54b3f4c49dafc34fce08f98f8f30fe496681f0c254a";
    private $client_secret = "2d093176c7c4df08e46474f802dd48b1688bfaf4375bacd5be7acbabffd864e2";
    private $redirect_uri = "http://localhost:8000/user/42/auth";
    private $final_redirect = "http://localhost:4200";
    private $v2auth = false;
    private $user;

    public function auth(Request $request)
    {

        $code = $request->toArray()['code'];

        exec ( "curl -F grant_type=authorization_code \
-F client_id=$this->client_id \
-F client_secret=$this->client_secret \
-F code=$code \
-F redirect_uri=$this->redirect_uri \
-X POST https://api.intra.42.fr/oauth/token", $v2auth) ;
        $returned = json_decode($v2auth[0]);

        exec("curl -H \"Authorization: Bearer $returned->access_token\" https://api.intra.42.fr/v2/me", $user_array);

        $this->user = json_decode($user_array[0]);
        $find_user = User::where('social_id', $this->user->id)->where('social_type', "intra42")->orWhere('email', $this->user->email)->first();
        if (isset($find_user) && !empty($find_user)){
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        } else {
            User::create([
                'social_type' => 'intra42',
                'social_id' => $this->user->id,
                'login' => $this->user->login."_".mt_rand(1, 100000),
                'email' => $this->user->email,
                'lang' => "EN",
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'avatar' => $this->user->image_url,
                'user_verified' => true,
            ]);
            $find_user = User::where('social_id', $this->user->id)->where('social_type', "intra42")->first();
            $token = LoggedUsersController::createToken($find_user->uid);
            return Redirect::to($this->final_redirect."/login?token={$token}&uid={$find_user->uid}");
        }
    }
}
