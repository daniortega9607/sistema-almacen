<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::select('products.*')->with(['fabric','design','color']);
        if (isset($request->search)) {
            $query->selectRaw('sku as text, id as value');
            if($request->search != true) {
                $query->where('sku','like','%'.$request->search.'%');
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
        $query = Product::select('products.*')->with(['fabric','design','color']);
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
        $item = Product::create($request->only([
            'sku','image','fabric_id','design_id','color_id'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item->with(['fabric','design','color'])->find($item->id),
            'message' => $item ? trans('global.created', [
                'item' => trans('global.product')
            ]) : trans('global.error_created', [
                'item' => trans('global.product')
            ])
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $status = $product->update($request->only([
            'sku','image','fabric_id','design_id','color_id'
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $product->with(['fabric','design','color'])->find($product->id),
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.product')
            ]) : trans('global.error_updated', [
                'item' => trans('global.product')
            ])
        ]);
    }

    public function destroy(Product $product)
    {
        $status = $product->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.product')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.product')
            ])
        ]);
    }
}
