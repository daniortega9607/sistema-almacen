<?php

namespace App\Http\Controllers;

use App\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $query = Stock::select('*')->with([
            'office','product', 'fabric', 'design', 'color', 'details'
        ]);
        if (isset($request->paginate)) {
            $paginate = $request->paginate;
            return response()->json($query->paginate($paginate),200);
        }
        return response()->json($query->get(),200);
    }

    public function init(Request $request)
    {
        $query = Stock::select('*')->with([
            'office','product', 'fabric', 'design', 'color', 'details'
        ]);
        $query->whereIn('id', $request->all());
        $query->orWhere(function($query) use ($request)
        {
            $query->whereNotIn('id',$request->all())
                  ->where('deleted_at',NULL);
        });
        $query->withTrashed();
        return response()->json($query->get(),200);
    }

    public function store(Request $request)
    {
        $stock = Stock::select('*')->where('office_id',$request->office_id)
        ->where('product_id',$request->product_id)->first();

        $item = null;
        $exists = false;
        if ($stock) {
            $exists = true;
            $item = $stock;
        } else {
            $item = Stock::create($request->only([
                'office_id','product_id','stock'
            ]));
        }

        $details = $request->details;

        if(count($details) > 0) {
            $item->details()->createMany($details);
            $item->stock = $item->details()->sum('remaining_quantity');
            $item->save();
        }

        return response()->json([
            'status' => (bool) $item,
            'exists' => $exists,
            'data'   => $item->with([
                'office','product', 'fabric', 'design', 'color', 'details'
            ])->find($item->id),
            'message' => $item ? trans('global.created', [
                'item' => trans('global.stock')
            ]) : trans('global.error_created', [
                'item' => trans('global.stock')
            ])
        ]);
    }

    public function update(Request $request, Stock $stock)
    {
        $status = $stock->update($request->only([
            'office_id','product_id','stock',
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $stock->with([
                'office','product', 'fabric', 'design', 'color', 'details'
            ])->find($stock->id),
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.stock')
            ]) : trans('global.error_updated', [
                'item' => trans('global.stock')
            ])
        ]);
    }

    public function destroy(Stock $stock)
    {
        $status = $stock->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.stock')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.stock')
            ])
        ]);
    }
}
