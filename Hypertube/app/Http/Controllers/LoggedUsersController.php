<?php

namespace App\Http\Controllers;

use App\LoggedUsers;
use Illuminate\Http\Request;
use \DateTime;
use Illuminate\Support\Facades\DB;

class LoggedUsersController extends Controller
{
    public static function createToken($uid, $createNewBean = false)
    {
        $activeToken = self::checkActiveToken($uid);
        if (!$createNewBean) {
            $loggedUserBean = empty($activeToken) ? new LoggedUsers : $activeToken;
        } else {
            $loggedUserBean = new LoggedUsers();
        }
        $loggedUserBean->uid = $uid;
        $loggedUserBean->token = IDGenerator::unique_id()."-".IDGenerator::unique_id();
        $loggedUserBean->updated_at = new DateTime();
        $loggedUserBean->save();
        return $loggedUserBean->token;
    }

    private static function checkActiveToken($uid) {
        $tokenBean = LoggedUsers::where('uid', $uid)->first();
        if (is_object($tokenBean) && $tokenBean->token)
            return $tokenBean;
        else
            return '';
    }

    public static function deleteUserToken(array $credentials){
        $loggedUserBean = LoggedUsers::where('token', $credentials['token'])->first();
        if ($loggedUserBean) {
            $loggedUserBean->delete();
        }
    }

    public static function checkCurrentUser($uid, $token)
    {
        $tokenBean = DB::table('logged_users')->where('token', $token)->where('uid', $uid)->first();
        if (!empty($tokenBean)) {
            return true;
        } else {
            return false;
        }
    }
}
