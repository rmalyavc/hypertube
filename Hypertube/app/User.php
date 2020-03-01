<?php

namespace App;

use App\Http\Controllers\ErrorManager;
use App\Http\Controllers\IDGenerator;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \DateTime;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $default = [
        'lang' => 'EN',
        'notify' => 1,
    ];

    protected $modifiableFields = [
        'email' => 'email',
        'password' => 'password',
        'first_name' => 'first_name',
        'last_name' => 'last_name',
        'notify' => 'notify',
        'lang' => 'lang'
    ];

    protected $validations = [
        'login' => ['required', 'string', 'min:4', 'max:255'],
        'first_name' => ['max:50'],
        'last_name' => ['max:50'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
    ];

    public function __construct()
    {
        parent::__construct();
    }

    protected function password_validator(array $data)
    {
        return Validator::make($data, ['password' => ['required', 'string', 'min:8', 'confirmed']]);
    }

    protected function validator(array $data, $uid)
    {
        $validate = [];
        $UserBean = User::where('uid', $uid)->select('uid', 'email')->first();
        foreach ($this->validations as $field => $conditions) {
            if (isset($data[$field])) {
                if ($field == "email" && $data['email'] == $UserBean->email)
                    continue;
                $validate[$field] = $conditions;
            }
        }
        return Validator::make($data, $validate);
    }

    public function changePassword($old, $current, $current_confirmed){
        if (Hash::check($old, $this->password)){
            App::setLocale(strtolower($this->lang));
            $validator = $this->password_validator(['password' => $current, 'password_confirmation' =>$current_confirmed]);
            if (!$validator->fails())
            {
                $this->password = Hash::make($current);
                $this->updated_at = new DateTime();
                $this->save();
                return json_encode([
                    'status' => true,
                ]);
            } else {
                return json_encode([
                   'status' => false,
                   'error' => $validator->errors(),
                ]);
            }
        } else {
            return json_encode([
                'status' => false,
                'error' => '401.11',
            ]);
        }
    }

    public function updateRecord(Request $request)
    {
        $userBean = User::where('uid', $request->input('uid'))->first();
        App::setLocale(strtolower($userBean->lang));
        $data = $this->formUpdateArray($request);
        $ready = $this->validator($data, $request->input('uid'));
        if (!$ready->fails()) {
            DB::table('users')
                ->where('uid', $request->input('uid'))
                ->update($data);
            $userBean = User::where('uid', $request->input('uid'))->first();
            return json_encode([
                'status' => true,
                'data' => $userBean,
            ]);
        } else {
            ErrorManager::logError("Fail to update record " . $request->input('uid') . " " . print_r($ready->errors(), true));
            return json_encode([
                'status' => false,
                'errors' => $ready->errors(),
            ]);
        }
    }

    protected function create(array $credentials)
    {
        $send_verify_email = true;
        $this->login = $credentials['login'];
        $this->email = $credentials['email'];
        if (isset($credentials['social_type']) && isset($credentials['social_id'])){
            $this->social_type = $credentials['social_type'];
            $this->social_id = $credentials['social_id'];
        }
        if (isset($credentials['password']))
            $this->password = $credentials['password'];
        $this->lang = $credentials['lang'];
        if (isset($credentials['first_name']))
            $this->first_name = $credentials['first_name'];
        if (isset($credentials['last_name']))
            $this->last_name = $credentials['last_name'];
        if (isset($credentials['avatar']))
            $this->avatar = $credentials['avatar'];
        if (isset($credentials['user_verified'])){
            $this->user_verified = true;
            $this->email_verified_at = new DateTime();
            $send_verify_email = false;
        }
        $this->uid = IDGenerator::unique_id();
        $this->save();
        if ($send_verify_email){
            $verifyBean = new UserVerification();
            $verifyBean->uid = $this->uid;
            $verifyBean->send_verification_email();
        }
        return true;
    }

    private function formUpdateArray(Request $request)
    {
        $updateArray = [];
        $req = $request->toArray();
        unset($this->modifiableFields['password']);
        foreach ($this->modifiableFields as $field) {
            if (isset($req[$field])) {
                $updateArray[$field] = $req[$field];
            } else {
                if (isset($this->default[$field]))
                    $updateArray[$field] = $this->default[$field];
                else
                    $updateArray[$field] = "";
//                if (empty($req[$field])){
//                    ErrorManager::logError("Empty field data entered. Field $field is empty");
//                }
            }
        }
        return $updateArray;
    }
}
