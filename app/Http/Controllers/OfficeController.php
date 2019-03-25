<?php

namespace App\Http\Controllers;

use App\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index(Request $request)
    {
        $query = Office::select('*');
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
        $query = Office::select('*');
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
        $item = Office::create($request->only(['name','address','phone']));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.office')
            ]) : trans('global.error_created', [
                'item' => trans('global.office')
            ])
        ]);
    }

    public function update(Request $request, Office $office)
    {
        $status = $office->update($request->only(['name','address','phone']));
        
        return response()->json([
            'status' => $status,
            'data'   => $office,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.office')
            ]) : trans('global.error_updated', [
                'item' => trans('global.office')
            ])
        ]);
    }

    public function destroy(Office $office)
    {
        $status = $office->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.office')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.office')
            ])
        ]);
    }
}
