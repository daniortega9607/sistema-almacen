<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockMovement extends Model
{    
    use SoftDeletes;

    protected $fillable = [
        'office_id','to_office_id','balance','total','status','user_id',
    ];

    public function office()
    {
        return $this->belongsTo('App\Office')->withTrashed();
    }

    public function toOffice()
    {
        return $this->belongsTo('App\Office','to_office_id')->withTrashed();
    }

    public function user()
    {
        return $this->belongsTo('App\User')->withTrashed();
    }
}
