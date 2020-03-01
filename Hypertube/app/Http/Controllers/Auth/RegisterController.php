<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\IDGenerator;
use App\User;
use App\Http\Controllers\Controller;
use App\UserVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'login' => ['required', 'string', 'min:4', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'first_name' => ['required', 'string', 'min:2', 'max:255'],
            'last_name' => ['required', 'string', 'min:2', 'max:255'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'login' => $data['login'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'lang' => $data['lang'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
        ]);
    }

    protected function register(Request $request){
        $data = [
            'login' => $request->input('login'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'password_confirmation' => $request->input('password_confirmation'),
            'lang' => $request->input('lang'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
        ];
        App::setLocale(strtolower($request->input('lang')));
        $ready = $this->validator($data);
        if (!$ready->fails()) {
            $this->create($data);
            return json_encode([
                'success' => true,
            ]);
        }
        else {
            return json_encode([
                'success' => false,
                'errors' => $ready->errors(),
            ]);
        }
    }
}
