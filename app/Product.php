<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{    
    use SoftDeletes;

    protected $fillable = [
        'sku','image','fabric_id','design_id','color_id'
    ];

    protected $casts = [
        'fabric_id' => 'integer',
        'design_id' => 'integer',
        'color_id' => 'integer',
    ];

    public function fabric()
    {
        return $this->belongsTo('App\Fabric')->withTrashed();
    }

    public function design()
    {
        return $this->belongsTo('App\Design')->withTrashed();
    }

    public function color()
    {
        return $this->belongsTo('App\Color')->withTrashed();
    }
}
