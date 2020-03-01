<?php

namespace App\Http\Middleware;

use App\LoggedUsers;
use Carbon\Carbon;
use Closure;
use \DateTime;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $reqArr = $request->toArray();
        if (isset($reqArr['token']) && !empty($reqArr['token'])){
            $loggedUserBean = LoggedUsers::where('token', $reqArr['token'])->orderBy('logged_users.created_at', 'desc')->first();
            if (!empty($loggedUserBean->token) && !empty($loggedUserBean->uid)){

                $last_request = $loggedUserBean->updated_at->format('Y-m-d H:i:s');
                $current_time = (new DateTime())->format('Y-m-d H:i:s');

                $difference = (strtotime($current_time) - strtotime($last_request)) / 60;
                if ($difference < 30) {
                    $loggedUserBean->updated_at = new DateTime();
                    $loggedUserBean->save();
                    return $next($request);
                }
                else {
                    $loggedUserBean->delete();
                    return json_encode([
                        "error" => "426",
                        'timediff' => $difference,
                        'currentTime' => (new DateTime())->format('Y-m-d H:s:i'),
                        'lastActive' => $loggedUserBean->updated_at->format('Y-m-d H:s:i'),
                        "status" => false,
                    ]);
                }
            }
        }
        return json_encode(["error" => "401.24", 'status' => false]);
    }
}
