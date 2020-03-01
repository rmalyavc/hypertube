<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\LoggedUsersController;
use App\User;
//use http\Client\Curl\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function validateLogin(Request $request)
    {
        $error_log = [];

        if (empty($request->input('login'))) {
            $error_log['login'] = "425";
        }
        if (empty($request->input('password'))){
            $error_log['password'] = "425";
        }
        if (!empty($error_log))
        {
            return [
                'status' => false,
                'error' => $error_log,
            ];
        }
        return [
            'status' => true,
        ];
    }

    public function login(Request $request)
    {
        $login_validate = $this->validateLogin($request);
        if (!$login_validate['status']) {
            return json_encode($login_validate);
        }
        $login = $request->input('login');
        $password = $request->input('password');
        $user = User::where('login', $login)->orWhere('email', $login)->first();
        if (isset($user) && !empty($user) && Hash::check($password, $user->password))
        {
            if ($user->user_verified) {
                return json_encode([
                    'token' => LoggedUsersController::createToken($user->uid),
                    'status' => true,
                    'data' => $user,
                ]);
            } else {
                return json_encode([
                    'token' => '',
                    'status' => false,
                    'data' => null,
                    'error' => '401.8',
                ]);
            }
        } else {
            return json_encode([
                'token' => '',
                'status' => false,
                'error' => '401',
                'data' => null
            ]);
        }
    }

    public function logout(Request $request)
    {
        LoggedUsersController::deleteUserToken([
            'uid' => $request->input('uid'),
            'token' => $request->input('token'),
        ]);
    }
}
