<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'name','invitation','tickets','confirm','user'
    ];
}
