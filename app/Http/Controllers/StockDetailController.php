<?php

namespace App\Http\Controllers;

use App\StockDetail;
use Illuminate\Http\Request;

class StockDetailController extends Controller
{
    public function store(Request $request)
    {
        $item = StockDetail::create($request->only([
            'stock_id', 'purchase_id','sale_id','quantity','buy_price'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.stock_detail')
            ]) : trans('global.error_created', [
                'item' => trans('global.stock_detail')
            ])
        ]);
    }

    public function destroy(StockDetail $stockDetail)
    {
        $status = $stockDetail->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.stock_detail')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.stock_detail')
            ])
        ]);
    }
}
