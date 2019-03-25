<?php

namespace App\Http\Controllers;

use App\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index(Request $request)
    {
        $query = Color::select('*');
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
        $query = Color::select('*');
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
        $item = Color::create($request->only(['name','color']));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.color')
            ]) : trans('global.error_created', [
                'item' => trans('global.color')
            ])
        ]);
    }

    public function update(Request $request, Color $color)
    {
        $status = $color->update($request->only(['name','color']));
        
        return response()->json([
            'status' => $status,
            'data'   => $color,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.color')
            ]) : trans('global.error_updated', [
                'item' => trans('global.color')
            ])
        ]);
    }

    public function destroy(Color $color)
    {
        $status = $color->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.color')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.color')
            ])
        ]);
    }
}
