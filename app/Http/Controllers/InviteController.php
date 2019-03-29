<?php

namespace App\Http\Controllers;

use App\Invite;
use Illuminate\Http\Request;

class InviteController extends Controller
{
    public function index(Request $request)
    {
        $query = Invite::select('*');
        return response()->json($query->get(),200);
    }

    public function show(Request $request, Invite $invite)
    {
        return response()->json($invite,200);
    }

    public function store(Request $request)
    {
        $item = Invite::create($request->only([
            'name','invitation','tickets','confirm','user'
        ]));

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
        ]);
    }

    public function update(Request $request, Invite $invite)
    {
        $status = $invite->update($request->only([
            'name','invitation','tickets','confirm','user'
        ]));
        
        return response()->json([
            'status' => $status,
            'data'   => $invite,
        ]);
    }

    public function destroy(Invite $invite)
    {
        $status = $invite->delete();

        return response()->json([
            'status' => $status,
        ]);
    }
}
