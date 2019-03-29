<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name','invitation','tickets','confirm','user'
    ];
}
