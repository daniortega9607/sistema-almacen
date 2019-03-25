<?php

namespace App\Http\Controllers;

use App\Fabric;
use Illuminate\Http\Request;

class FabricController extends Controller
{
    public function index(Request $request)
    {
        $query = Fabric::select('*');
        if (isset($request->search)) {
            $query->selectRaw('name as text, id as value');
            if($request->search != true) {
                $query->where('name','like','%'.$request->search.'%');
            }
            if (isset($request->id)) {
                $query->where('id',$request->id);
            }
        }
        if (isset($request->paginate)) {
            $paginate = $request->paginate;
            return response()->json($query->paginate($paginate),200);
        }
        return response()->json($query->get(),200);
    }

    public function init(Request $request)
    {
        $query = Fabric::select('*');
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
        $item = Fabric::create($request->only([
            'name','buy_price','sell_price'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.fabric')
            ]) : trans('global.error_created', [
                'item' => trans('global.fabric')
            ])
        ]);
    }

    public function update(Request $request, Fabric $fabric)
    {
        $status = $fabric->update($request->only([
            'name','buy_price','sell_price'
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $fabric,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.fabric')
            ]) : trans('global.error_updated', [
                'item' => trans('global.fabric')
            ])
        ]);
    }

    public function destroy(Fabric $fabric)
    {
        $status = $fabric->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.fabric')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.fabric')
            ])
        ]);
    }
}
