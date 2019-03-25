<?php

namespace App\Http\Controllers;

use App\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $query = Supplier::select('*');
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
        $query = Supplier::select('*');
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
        $item = Supplier::create($request->only([
            'name','address','phone','mobilephone','email','credit_days','comments'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.supplier')
            ]) : trans('global.error_created', [
                'item' => trans('global.supplier')
            ])
        ]);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $status = $supplier->update($request->only([
            'name','address','phone','mobilephone','email','credit_days','comments'
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $supplier,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.supplier')
            ]) : trans('global.error_updated', [
                'item' => trans('global.supplier')
            ])
        ]);
    }

    public function destroy(Supplier $supplier)
    {
        $status = $supplier->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.supplier')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.supplier')
            ])
        ]);
    }
}
