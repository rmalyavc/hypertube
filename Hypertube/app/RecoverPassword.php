<?php

namespace App;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\IDGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \DateTime;

class RecoverPassword extends Model
{
    protected $table = 'password_resets';

    //
    public function recover_password()
    {
        if (!empty($this->reset_token) && !empty($this->uid)) {
            $date_created = $this->created_at->format('Y-m-d H:i:s');
            $current_time = (new DateTime())->format('Y-m-d H:i:s');

            $difference = (strtotime($current_time) - strtotime($date_created)) / 60;
            if ($difference < 30) {
                $this->validated = true;
                return true;
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    }

    protected function password_validator(array $data)
    {
        return Validator::make($data, [
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }


    public function set_new_password($password, $password_confirmation)
    {
        if (!empty($this->reset_token) && !empty($this->uid)){
            $userBean = User::where('uid', $this->uid)->select('uid','login', 'password', 'updated_at')->first();
            App::setLocale(strtolower($userBean->lang));
            $ready = $this->password_validator([
                'password' => $password,
                'password_confirmation' => $password_confirmation,
                ]);
            if (!$ready->fails()) {
                DB::table('users')->where('uid', $this->uid)
                    ->update([
                        'password' => Hash::make($password),
                        'updated_at' => new DateTime(),
                    ]);
                DB::table('password_resets')->where('reset_token','=', $this->reset_token)->delete();
                return [
                    'status' => true,
                    'data' => ['login' => $userBean->login],
                ];
            }
            else {
                return [
                    'status' => false,
                    'error' => $ready->errors(),
                ];
            }
        }
        return [
            'status' => false,
            'error' => '417',
        ];
    }

    public function send_recover_email($lang = '')
    {
        if (!empty($this->email)) {
            $userBean = User::where('email', $this->email)->select('email', 'login', 'lang', 'uid')->first();
            if (!isset($userBean->login))
                return false;
            $subject = 'Zlye Wolki Password recovering';
            $template = 'recover_password';

            if (!empty($lang)) {
                switch ($lang) {
                    case "RU":
                        $subject = 'Zlye Wolki Восстановление пароля';
                        $template = strtolower($lang) . "_" . $template;
                        break;
                    default:
                        $template = "en_" . $template;
                        break;
                }
            } else if ($userBean->lang != 'EN') {
                $template = strtolower($userBean->lang) . "_" . $template;
                switch ($userBean->lang) {
                    case "RU":
                        $subject = 'Zlye Wolki Восстановление пароля';
                        break;
                    default:
                        $template = "en_" . $template;
                        break;
                }
            } else {
                $template = "en_" . $template;
            }
            $this->reset_token = IDGenerator::unique_id() . "-" . IDGenerator::unique_id();
            $this->uid = $userBean->uid;
            $this->save();
            $emailBean = new EmailController();
            $emailBean->sendEmail($userBean, ['reset_token' => $this->reset_token], [
                'to' => $this->email,
                'type' => 'Password recovering',
                'subject' => $subject,
                'template' => $template,
                'message' => ""
            ]);
            return true;
        }
        return false;
    }
}
