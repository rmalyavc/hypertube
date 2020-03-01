<?php

namespace App;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\IDGenerator;
use Illuminate\Database\Eloquent\Model;
use \DateTime;

class UserVerification extends Model
{
    public function confirm_verification(){
        if (!empty($this->verify_token)) {
            $verifyBean = UserVerification::where('verify_token', $this->verify_token);
            $verifyBean->verified = true;
            $verifyBean->updated_at = new DateTime();
            $verifyBean->save();
            $userBean = User::where('uid', $verifyBean->uid)->select()->first();
            $userBean->user_verified = true;
            $userBean->email_verified_at = new DateTime();
            $userBean->updated_at = new DateTime();
            $userBean->save();
            return true;
        }
        return false;
    }

    public function send_verification_email()
    {
        if (!empty($this->uid)) {
            $userBean = User::where('uid', $this->uid)->select('uid','email', 'login', 'lang')->first();
            $subject = 'Zlye Wolki Email Conformation';
            $template = 'email_conformation';

            if ($userBean->lang != 'EN') {
                $template = strtolower($userBean->lang) . "_" . $template;
                switch ($userBean->lang) {
                    case "RU":
                        $subject = 'Zlye Wolki Подтверждение электронной почты';
                        break;
                    default:
                        $template = "en_" . $template;
                        break;
                }
            } else {
                $template = "en_" . $template;
            }
            $this->verify_token = IDGenerator::unique_id() . "-" . IDGenerator::unique_id();
            $this->save();
            $emailBean = new EmailController();
            $emailBean->sendEmail($userBean, ['verify_token' => $this->verify_token], [
                'to' => $userBean->email,
                'type' => 'Email Conformation',
                'subject' => $subject,
                'template' => $template,
                'message' => ""
            ]);
        }
    }
}
