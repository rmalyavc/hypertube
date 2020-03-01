<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'email';

    protected $fillable = ['eid', 'deleted', 'to_uid', 'from', 'to', 'subject', 'type'];
    //
}
