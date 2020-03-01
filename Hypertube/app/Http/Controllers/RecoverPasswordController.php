<?php

namespace App\Http\Controllers;

use App\RecoverPassword;
use Illuminate\Http\Request;

class RecoverPasswordController extends Controller
{
    public function forgot_password(Request $request)
    {
        $recoverBean = new RecoverPassword();
        $recoverBean->email = $request->input('email');
        $result = $recoverBean->send_recover_email($request->input('lang'));
        if ($result == true)
            return json_encode(['status' => true]);
        else
                return json_encode(['status' => false, 'error' => '424']);
    }

    public function check_link(Request $request)
    {
        $recoverBean = RecoverPassword::where('reset_token',"=", $request->input('token'))->first();
        if (!empty($recoverBean))
            return $recoverBean->recover_password();
        else
            return false;
    }

    public function recover_password(Request $request)
    {
        if ($this->check_link($request)) {
            $recoverBean = RecoverPassword::where('reset_token', $request->input('token'))->first();
            if (!empty($recoverBean)) {
                return json_encode(
                    $recoverBean->set_new_password($request->input('password'), $request->input('password_confirmation'))
                );
            }
        } else {
            return json_encode([
                'status' => false,
                'error' => '401',
            ]);
        }
    }
}
