<?php

namespace App\Http\Controllers;

use Validator;
use App\Team;
use App\User;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function store(Request $request)
    {
        $item = Team::create($request->only([
            'name'
        ]));
        
        if (isset($request->user)) {
            $data = $request->user;

            $validator = Validator::make($data, [
                'email' => 'unique:users|email',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ], 200);
            }

            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);

            $details = [
                'team_id' => $item->id
            ];
            $user->details()->create($details);
        }

        return response()->json([
            'status' => (bool) $item,
            'data'   => $item,
            'message' => $item ? trans('global.created', [
                'item' => trans('global.team')
            ]) : trans('global.error_created', [
                'item' => trans('global.team')
            ])
        ]);
    }
}
