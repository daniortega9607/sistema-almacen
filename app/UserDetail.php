<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id', 'team_id','user_type','customer_id'
    ];

    protected $casts = [
        'user_id' => 'integer',
        'team_id' => 'integer',
        'customer_id' => 'integer',
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
