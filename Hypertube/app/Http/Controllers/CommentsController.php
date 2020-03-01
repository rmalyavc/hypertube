<?php

namespace App\Http\Controllers;

use App\Comments;
use App\Notification;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \DateTime;

class CommentsController extends Controller
{
    private function parse_message($message, $from_uid, $movie_id){
        $message = preg_replace_callback('|(@)\w+|',
            function($match) use ($from_uid, $movie_id){
                $match = str_replace('@', '', $match[0]);
                $user_id = User::where('login', $match)->select('uid')->first();
                if ($user_id) {
                    NotificationController::set_notification($from_uid, $user_id->uid, $movie_id);
                    return "<a href='/profile/".$user_id->uid."'>$match</a>";
                }
                return ' @'.$match;
        }, $message);
        return $message;
    }

    protected function setComment(Request $request)
    {
        $a_requ = $request->toArray();
        $required_params = ['uid', 'comment', 'record_id'];
        $required_check = true;

        foreach ($required_params as $param) {
            if (!isset($a_requ[$param]) || empty($a_requ[$param])) {
                ErrorManager::logError("Required param is not set ['$param''].");
                $required_check = false;
            }
        }
        if (!$required_check) {
            return json_encode([
                'status' => false,
                'error' => '425',
            ]);
        }
        $userBean = User::where('uid', $a_requ['uid'])->select('users.uid')->first();
        if (!empty($userBean)) {
            $commentBean = new Comments;
            $commentBean->uid = $a_requ['uid'];
            $commentBean->record_id = $a_requ['record_id'];
            $commentBean->comment = $a_requ['comment'];
            $commentBean->parsed_comment = $this->parse_message($a_requ['comment'], $a_requ['uid'], $a_requ['record_id']);
            $commentBean->save();
            return json_encode([
                'status' => true,
            ]);
        } else {
            ErrorManager::logError("User with uid [" . $a_requ['uid'] . "] does not exist.");
            return json_encode([
                'status' => false,
                'error' => "417",
            ]);
        }
    }

    protected function editComment(Request $server_request)
    {
        $request = $server_request->toArray();
        if (isset($request['id']) && !empty($request['id']) && isset($request['uid']) && !empty($request['uid']) && !empty($request['comment'])) {
            if (LoggedUsersController::checkCurrentUser($request['uid'], $request['token'])) {
                $commentBean = Comments::find($request['id']);
                $commentBean->comment = $request['comment'];
                $commentBean->parsed_comment = $this->parse_message($request['comment'], $commentBean->uid, $commentBean->record_id);
                $commentBean->updated_at = new DateTime();
                $commentBean->save();
                return json_encode(['status' => true, 'parsed_comment' => $commentBean->parsed_comment]);
            } else {
                return json_encode(['status' => false, 'error' => '401']);
            }
        }
        return json_encode(['status' => false, 'error' => "425"]);
    }

    protected function getComments(Request $request)
    {
        $a_requ = $request->toArray();
        $skip = $a_requ['skip'];
        $limit = $a_requ['limit'];
        if (!isset($a_requ['record_id']) || empty($a_requ['record_id'])) {
            ErrorManager::logError('Warning. Request for empty record id.');
            return json_encode([
                'status' => false,
                'error' => '425',
            ]);
        }
        if ($skip == '')
            $skip = 0;
        if ($limit == '')
            $limit = 5;
        $comment_array = Comments::where('record_id', $a_requ['record_id'])->join('users', 'users.uid', '=', 'comments.uid')->
        select('comments.*', 'users.login', 'users.first_name', 'users.last_name', 'users.avatar')->orderBy('comments.created_at', 'desc')->skip($skip)->take($limit)->get();
        foreach ($comment_array as $key => $val){
            if (!file_exists($comment_array[$key]['avatar']))
                $comment_array[$key]['avatar'] = "";
        }
        return json_encode([
            'status' => true,
            'data' => $comment_array,
        ]);
    }

    protected function parse_logins(Request $request)
    {
        $login = $request->input('login');
        $users = [];
        $users_db = DB::table('users')->select('login', "first_name", "last_name")->get();
        foreach ($users_db as $key => $user)
        {
            $pos = stripos($user->login, $login);
            if ($pos !== false) {
                $users[] = [
                    'position' => $pos,
                    'login' => $user->login,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                ];
            }
        }

        usort($users, function ($a, $b){
            return $a['position'] > $b['position'] ? 1 : -1;
        });

        return json_encode([
            'status' => true,
            'data' => $users,
        ]);
    }

    protected function deleteComment(Request $server_request)
    {
        $request = $server_request->toArray();
        if (isset($request['id']) && !empty($request['id']) && isset($request['uid']) && !empty($request['uid'])) {
            if (LoggedUsersController::checkCurrentUser($request['uid'], $request['token'])) {
                $commentBean = Comments::find($request['id']);
                $commentBean->delete();
                return json_encode(['status' => true]);
            } else {
                return json_encode(['status' => false, 'error' => '401']);
            }
        }
        return json_encode(['status' => false, 'error' => "425"]);
    }
}
