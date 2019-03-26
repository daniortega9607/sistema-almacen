<?php

namespace App\Http\Controllers;

use App\StockMovement;
use Illuminate\Http\Request;

class StockMovementController extends Controller
{
    public function index(Request $request)
    {
        $query = StockMovement::select('*');
        /*if (isset($request->search)) {
            $query->selectRaw('name as text, id as value');
            if($request->search != true) {
                $query->where('name','like','%'.$request->search.'%');
            }
            if (isset($request->id)) {
                $query->where('id',$request->id);
            }
        }*/
        if (isset($request->paginate)) {
            $paginate = $request->paginate;
            return response()->json($query->paginate($paginate),200);
        }
        return response()->json($query->get(),200);
    }

    public function init(Request $request)
    {
        $query = StockMovement::select('*');
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
        $data = $request->only([
            'office_id','to_office_id','balance','total','status',
        ]);
        $data['user_id'] = $request->user()->id;
        
        $item = StockMovement::create($data);

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.stock_movement')
            ]) : trans('global.error_created', [
                'item' => trans('global.stock_movement')
            ])
        ]);
    }

    public function update(Request $request, StockMovement $stockMovement)
    {
        $status = $stockMovement->update($request->only([
            'office_id','to_office_id','balance','total','status',
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $stockMovement,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.stock_movement')
            ]) : trans('global.error_updated', [
                'item' => trans('global.stock_movement')
            ])
        ]);
    }

    public function destroy(StockMovement $stockMovement)
    {
        $status = $stockMovement->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.stock_movement')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.stock_movement')
            ])
        ]);
    }
}
