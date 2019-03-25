<?php

namespace App\Http\Controllers;

use App\Design;
use Illuminate\Http\Request;

class DesignController extends Controller
{
    public function index(Request $request)
    {
        $query = Design::select('*');
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
        $query = Design::select('*');
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
        $item = Design::create($request->only(['name']));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.design')
            ]) : trans('global.error_created', [
                'item' => trans('global.design')
            ])
        ]);
    }

    public function update(Request $request, Design $design)
    {
        $status = $design->update($request->only(['name']));
        
        return response()->json([
            'status' => $status,
            'data'   => $design,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.design')
            ]) : trans('global.error_updated', [
                'item' => trans('global.design')
            ])
        ]);
    }

    public function destroy(Design $design)
    {
        $status = $design->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.design')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.design')
            ])
        ]);
    }
}
