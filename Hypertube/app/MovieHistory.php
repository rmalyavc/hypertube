<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MovieHistory extends Model
{
    protected $table = 'movie_history';

    public function get_user_history(string $id = '', int $limit = 20, int $skip = 0, string $order_by = 'updated_at', string $sort_order = 'desc')
    {
        $table_name = '';
        switch ($order_by) {
            case 'name':
                $table_name = 'movies.';
                break;
            case 'updated_at':
                $table_name = 'movie_history.';
                break;
        }
        $return = $this->where('uid', $id)->join('movies', 'movie_history.movie_id', '=', 'movies.movie_id')->orderBy($table_name . $order_by, $sort_order)->skip($skip)->take($limit)->get();
        return $return;
    }
    //
}
