<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockDetail extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'stock_id', 'purchase_id','sale_id','quantity','buy_price'
    ];
}
