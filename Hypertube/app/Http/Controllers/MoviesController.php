<?php

namespace App\Http\Controllers;

use App\Movies;
use \DateTime;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    public function addOrUpdateMovie(array $movieParams)
    {
        $movieBean = Movies::where('movie_id', $movieParams['movie_id'])->first();
        if (!isset($movieBean->rec_id) || empty($movieBean->rec_id)) {
            $movieBean = new Movies;
            $movieBean->rec_id = IDGenerator::unique_id();
            $movieBean->movie_id = $movieParams['movie_id'];
        }
        $movieBean->name = $movieParams['name'];
        $movieBean->img = $movieParams['img'];
        $movieBean->updated_at = new DateTime();
        $movieBean->save();
    }

    public function getExpiredMovies(Request $request){
        $today_date = (new DateTime())->modify('-31 day');
        $movies = Movies::select("movie_id")->where('updated_at', '<', $today_date)->get();
        return json_encode($movies);
    }
    //
}
