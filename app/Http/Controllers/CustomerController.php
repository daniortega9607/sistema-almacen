<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::select('*');
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
        $query = Customer::select('*');
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
        $item = Customer::create($request->only([
            'name','address','phone','mobilephone','email','credit_days','comments'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.customer')
            ]) : trans('global.error_created', [
                'item' => trans('global.customer')
            ])
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $status = $customer->update($request->only([
            'name','address','phone','mobilephone','email','credit_days','comments'
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $customer,
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.customer')
            ]) : trans('global.error_updated', [
                'item' => trans('global.customer')
            ])
        ]);
    }

    public function destroy(Customer $customer)
    {
        $status = $customer->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.customer')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.customer')
            ])
        ]);
    }
}
