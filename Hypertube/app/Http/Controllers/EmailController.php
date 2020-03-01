<?php

namespace App\Http\Controllers;

use App\Email;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function testEmail()
    {
        $user = new User();
        $user->login = 'Zloy Wolk';
        $user->email = 'roman@beakon.com.au';
        $user->first_name = 'Roman';
        $user->last_name = 'Zloy Wolk';
        $this->sendEmail($user, [],[
            'to' => '',
            'type' => 'Email Conformation',
            'subject' => 'Zlye Wolki Email Conformation',
            'template' => 'email_conformation',
            'message' => ""
        ]);
//        return json_encode(['status' => $this->sendEmail($user, [],[
//            'to' => '',
//            'type' => 'Email Conformation',
//            'subject' => 'Zlye Wolki Email Conformation',
//            'template' => 'email_conformation',
//            'message' => ""
//        ])]);

        $user = new User();
        $user->login = 'Kandzy';
        $user->email = 'dima@beakon.com.au';
        $user->first_name = 'Dima';
        $user->last_name = 'Kan Dzy';
        $this->sendEmail($user, [],[
            'to' => 'contrisaidme@gmail.com',
            'type' => 'Email Conformation',
            'subject' => 'Zlye Wolki Email Conformation',
            'template' => 'email_conformation',
            'message' => ""
        ]);
//        return json_encode(['status' => $this->sendEmail($user, [],[
//            'to' => 'contrisaidme@gmail.com',
//            'type' => 'Email Conformation',
//            'subject' => 'Zlye Wolki Email Conformation',
//            'template' => 'email_conformation',
//            'message' => ""
//        ])]);
    }

    /**
     * @param User $user
     * @param $additional
     * @param array $mailParams
     * @return bool
     */
    public function sendEmail(User $user, $additional, array $mailParams = ['from' => '', 'to' => '', 'type' => '', 'subject' => '', 'template' => '', 'message' => ''])
    {
        if (empty($mailParams['template']))
            return false;

        if (empty($mailParams['to']) || !isset($mailParams['to'])) {
            if ($user && !empty($user->email)) {
                $mail_to = $user->email;
            } else {
                return false;
            }
        } else {
            $mail_to = $mailParams['to'];
        }

        if (isset($mailParams['from']) && !empty($mailParams['from']))
            $mail_form = $mailParams['from'];
        else
            $mail_form = "zlyewolki@gmail.com";

        if (isset($mailParams['subject']) && !empty($mailParams['subject']))
            $mail_subject = $mailParams['subject'];
        else
            $mail_subject = "Undefined";

        if (empty($mailParams['type']))
            $type = 'General';
        else
            $type = $mailParams['type'];

        if ($user && isset($user->first_name) && !empty($user->first_name)) {
            $name = $user->first_name;
            if (isset($user->last_name) && !empty($user->last_name)) {
                $name .= " " . $user->last_name;
            }
        } else {
            if ($user)
                $name = $user->login;
            else
                $name = "";
        }

        $data = [
            'user' => $user,
            'message' => !empty($mailParams['message']) ? $mailParams['message'] : "",
            'additionalData' => $additional,
        ];
        $data['unsubscribe_link'] = "#";
        if ($user && $user->uid) {
            $token = LoggedUsersController::createToken($user->uid, true);
            $data['unsubscribe_link'] = "http://localhost:8000/notification/unsubscribe/$user->uid?token=$token";
        }

        Mail::send(['html' => $mailParams['template']], ['data' => $data], function ($message) use ($mail_to, $name, $mail_form, $mail_subject) {
            $message->to($mail_to, $name)->subject($mail_subject);
            $message->from($mail_form, "Zlye Wolki");// corp. LCC
        });

        if ($user && $user->uid)
            $user_id = $user->uid;
        else
            $user_id = "";

        $email = new Email;
        $email->eid = IDGenerator::unique_id();
        $email->to_uid = $user_id;
        $email->from = $mail_form;
        $email->to = $mail_to;
        $email->subject = $mail_subject;
        $email->type = $type;
        $email->save();

        return true;
    }
    //
}
