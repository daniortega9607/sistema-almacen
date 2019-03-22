<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'team_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User')->withTrashed();
    }

    public function team()
    {
        return $this->belongsTo('App\Team');
    }
}
