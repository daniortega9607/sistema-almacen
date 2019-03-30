<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $primaryKey = 'invitation';
    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'name','invitation','tickets','confirm','user'
    ];
    protected $casts = [
        'confirm' => 'boolean',
    ];
}
