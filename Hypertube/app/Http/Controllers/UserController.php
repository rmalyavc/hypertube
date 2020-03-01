<?php

namespace App\Http\Controllers;

use App\LoggedUsers;
use App\MovieHistory;
use App\Movies;
use App\User;
use Illuminate\Http\Request;
use \DateTime;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * @param Request $request
     */
    protected function updateUserRecord(Request $request)
    {
        $userBean = new User();
        return $userBean->updateRecord($request);
    }

    protected function changePassword(Request $request){
        $req_ar = $request->toArray();
        if (empty($req_ar['uid']) || empty($req_ar['token']))
            return json_encode([
                'status' => false,
                'error' => '401',
            ]);
        if (LoggedUsersController::checkCurrentUser($req_ar['uid'], $req_ar['token'])) {
            $userBean = User::where('uid', $req_ar['uid'])->first();
            return $userBean->changePassword($req_ar['old_password'], $req_ar['password'], $req_ar['password_confirmation']);
        } else {
            return json_encode([
                'status' => false,
                'error' => '401',
            ]);
        }
    }

    protected function getUserMovieHistory(Request $request)
    {
        $req = $request->toArray();
        $movieHistoryBean = new MovieHistory();
        return json_encode(['status' => true, 'data' => $movieHistoryBean->get_user_history($req['uid'], $req['limit'], $req['skip'], $req['order_by'], $req['sort_order'])]);
    }

    protected function getUserStatus(Request $request)
    {
        $loggedUserBean = LoggedUsers::where('uid', $request->input('uid'))->where('token', $request->input('token'))->orderBy('logged_users.created_at', 'desc')->first();
        if (isset($loggedUserBean->token) && !empty($loggedUserBean->token)) {
            return json_encode([
                'status' => true,
            ]);
        } else {
            return json_encode([
                'status' => false,
            ]);
        }
    }

    protected function getUserData(Request $request, $login = '')
    {
        $reqArray = $request->toArray();
        if (!empty($login)) {
            $userBean = User::where('login', $login)->first();
            if (isset($userBean) && !empty($userBean)) {
                return json_encode([
                    'status' => true,
                    'data' => $userBean,
                ]);
            } else {
                return json_encode([
                    'status' => false,
                    'error' => '404',
                ]);
            }
        } else if (!empty($reqArray['uid'])) {
            $userBean = User::where('uid', $reqArray['uid'])->first();
            if (isset($userBean) && !empty($userBean)) {
                if (!file_exists($userBean->avatar) && !filter_var($userBean->avatar, FILTER_VALIDATE_URL))
                    $userBean->avatar = "";
                return json_encode([
                    'status' => true,
                    'data' => $userBean,
                ]);
            } else {
                return json_encode([
                    'status' => false,
                    'error' => '404',
                ]);
            }
        } else {
            return json_encode([
                'status' => false,
                'error' => '417',
            ]);
        }
    }

    protected function userUpdateImage(Request $request)
    {
        $allowed_extentions = [
            'jpeg', 'jpg', 'png', 'bmp', 'gif', 'svg',
        ];
        if (!empty($_FILES['image'])) {
            App::setLocale(strtolower($request->input('lang')));
            if ($request->input('lang') == "RU")
                $file_error = 'Файл должен быть изображением (jpeg, png, bmp, gif, or svg)';
            else
                $file_error = 'The file must be an image (jpeg, png, bmp, gif, or svg)';
            $validator = Validator::make($request->all(),
                [
                    'file' => 'image',
                ],
                [
                    'file.image' => $file_error,
                ]);
            if ($validator->fails()) {
                return array(
                    'status' => false,
                    'error' => $validator->errors()
                );
            }
            $extension = $request->file('image')->getClientOriginalExtension();
            $size = $request->file('image')->getSize();
            if ($size > 5242880) {
                return json_encode([
                    'status' => false,
                    '$size' => "413",
                ]);
            }
            if (!in_array($extension, $allowed_extentions) || empty($extension)) {
                return json_encode([
                    'status' => false,
                    'error' => '415',
                ]);
            }
            $user = User::join('logged_users', 'logged_users.uid', '=', 'users.uid')->where('logged_users.token', $request->input('token'))->first();
            $dir = "uploads/" . $user->login . "/";
            $filename = "avatar_" . $_FILES['image']['name'];
            if (!empty($user->avatar)) {
                if (file_exists($user->avatar))
                    unlink($user->avatar);
            }
            DB::table('users')->where('users.uid', $user->uid)->update([
                'avatar' => $dir . $filename,
            ]);
            $request->file('image')->move($dir, $filename);
            return json_encode(['status' => true]);
        } else {
            return json_encode(['status' => false]);
        }
    }

    protected function addUserMovieHistory(Request $request) {
        $db_fields = ['uid', 'movie_id', 'name', 'img'];
        $req = $request->toArray();
        $insertStatus = true;
        $emptyFields = [];

        //CHECK MANDATORY PARAMS
        foreach ($db_fields as $field) {
            if (!isset($req[$field]) || empty($req[$field])) {
                ErrorManager::logError("Field [$field] is empty");
                $emptyFields[] = $field;
                $insertStatus = false;
            }
        }
        if ($insertStatus == false) {
            $fieldsString = implode(", ", $emptyFields);
            return json_encode([
                'status' => false,
                'error' => "400",
            ]);
        }
        //ADD NEW MOVIE IF NOT EXIST
        $moviesControllerBean = new MoviesController();
        $moviesControllerBean->addOrUpdateMovie([
            'movie_id' => $req['movie_id'],
            'name' => $req['name'],
            'img' => $req['img'],
        ]);
        //ADD MOVIE TO USER HISTORY
        $movieHistoryBean = MovieHistory::where('movie_id', $req['movie_id'])->where('uid', $req['uid'])->first();
        if (empty($movieHistoryBean->rec_id) || !isset($movieHistoryBean->rec_id)) {
            $movieHistoryBean = new MovieHistory;
            $movieHistoryBean->rec_id = IDGenerator::unique_id();
        }
        $movieHistoryBean->uid = $req['uid'];
        $movieHistoryBean->movie_id = $req['movie_id'];
        $movieHistoryBean->updated_at = new DateTime();
        $movieHistoryBean->save();

        return json_encode([
            'status' => true,
        ]);
    }

    public function email_unsubscribe(Request $request, $uid){
//        return $uid;
        if (!empty($uid)) {
            $req = $request->toArray();
            $userBean = User::select("*")->where('uid', $uid)->first();
            if (!empty($userBean)) {
                $userBean->notify = false;
                $userBean->save();
            }
            $loginBean = LoggedUsers::where('token', $req['token'])->first();
            if (!empty($loginBean)) {
                $loginBean->delete();
            }
        }
        return "<script>window.close();</script>";
    }
    //
}
