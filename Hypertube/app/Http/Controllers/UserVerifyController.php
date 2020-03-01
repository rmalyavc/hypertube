<?php

namespace App\Http\Controllers;

use App\User;
use App\UserVerification;
use Illuminate\Http\Request;
use \DateTime;

class UserVerifyController extends Controller
{
    public function verify(Request $request, string $token)
    {
        if (!empty($token)) {
            $VerificationBean = UserVerification::where('verify_token', $token)->first();
            if (empty($VerificationBean))
                return json_encode(['status' => false, 'error' => '401']);
            if (!$VerificationBean->verified) {
                $userBean = User::where('uid', $VerificationBean->uid)->first();
                if (!$userBean->user_verified) {
                    $VerificationBean->verified = true;
                    $VerificationBean->updated_at = new DateTime();
                    $VerificationBean->save();
                    $userBean->user_verified = true;
                    $userBean->email_verified_at = $VerificationBean->updated_at;
                    $userBean->remember_token = $token;
                    $userBean->save();
                    return json_encode([
                        'status' => true,
                        'token' => LoggedUsersController::createToken($userBean->uid),
                        'data' => $userBean,
                    ]);
                } else {
                    return json_encode([
                        'status' => false,
                        'data' => '',
                        'error' => '448',
                    ]);
                }
            }
            return json_encode([
                'status' => false,
                'data' => '',
                'error' => '449',
            ]);
        }
        else {
            return json_encode([
                'status' => false,
                'data' => '',
                'error' => '401',
            ]);
        }
    }
}
