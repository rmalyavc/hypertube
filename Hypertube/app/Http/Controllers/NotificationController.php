<?php

namespace App\Http\Controllers;

use App\Notification;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function test_set_notify(){
        self::set_notification('c2w87vwbqi8s4s0k40oo8w04440k0go', 'd69pb6wej8ooko8wsgkswwgccsgg', '420817');
    }

    public static function set_notification($from_uid, $to_uid, $movie_id){
        $notify_bean = new Notification();
        $notify_bean->uid_from = $from_uid;
        $notify_bean->uid_to = $to_uid;
        $notify_bean->movie_id = $movie_id;
        $notify_bean->save();
        $userBean = User::select("uid","login", "first_name", "last_name", "email", "notify", "lang")->where("uid", $to_uid)->first();
        if ($userBean->notify) {
            $subject = "Zlye Wolki New Notification";
            $template = 'new_notification';

            if ($userBean->lang != 'EN') {
                $template = strtolower($userBean->lang)."_".$template;
                switch ($userBean->lang) {
                    case "RU":
                        $subject = "Zlye Wolki новое уведомление";
                        break;
                    default:
                        $template = "en_".$template;
                        break;
                }
            } else {
                $template = "en_".$template;
            }
            $emailBean = new EmailController();
            $emailBean->sendEmail($userBean, [''=>""], [
                'to' => $userBean->email,
                'type' => 'Notification',
                'subject' => $subject,
                'template' => $template,
                'message' => ""
            ]);
        }
    }

    protected function get_notifications(Request $request){
        $uid = $request->input('uid');
        $notifications_array = [];
        $notifications = Notification::where('notification.uid_to', $uid)
            ->select('notification.uid_to', 'notification.uid_from', 'notification.movie_id', 'notification.id', 'users.login', 'movies.name')
            ->join('users', 'users.uid', '=', 'notification.uid_from')
            ->join('movies', 'movies.movie_id', '=', 'notification.movie_id')
            ->orderBy('notification.created_at','desc')
            ->get();
        if ($notifications) {
            foreach ($notifications as $num => $notification) {
                $notifications_array[] = [
                    'id' => $notification->id,
                    'from' => [
                        'id' => $notification->uid_from,
                        'login' => $notification->login,
                    ],
                    'movie' => [
                        'id' => $notification->movie_id,
                        'name' => $notification->name,
                    ],
                ];
            }
            return json_encode(['status' => true, 'data' => $notifications_array]);
        } else {
            return json_encode(['status' => false]);
        }
    }

    protected function clear_notification(Request $request){
        $id = $request->input('id');
        if (!empty($id)) {
            $notify_bean = (Notification::find($id));
            if ($notify_bean->uid_to == $request->input('uid')){
                $notify_bean->delete();
            }
        }
    }
}
