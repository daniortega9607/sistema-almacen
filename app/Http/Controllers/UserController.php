<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::selectRaw('
            users.*, 
            CASE
                WHEN user_details.user_type = 1 THEN "Administrador"
                WHEN user_details.user_type = 2 THEN "Vendedor"
                ELSE "Cliente"
            END as user_type,
            customers.name as customer
        ')->with(['details.team']);
        $query->join('user_details','user_details.user_id','=','users.id');
        $query->leftJoin('customers','user_details.customer_id','=','customers.id');
        $query->where('team_id', $request->user()->details->team_id);
        if (isset($request->paginate)) {
            $paginate = $request->paginate;
            return response()->json($query->paginate($paginate),200);
        }
        return response()->json($query->get(),200);
    }

    public function init(Request $request)
    {
        $query = User::selectRaw('
            users.*,
            CASE
                WHEN user_details.user_type = 1 THEN "Administrador"
                WHEN user_details.user_type = 2 THEN "Vendedor"
                ELSE "Cliente"
            END as user_type,
            customers.name as customer
        ')->with(['details.team']);
        $query->join('user_details','user_details.user_id','=','users.id');
        $query->leftJoin('customers','user_details.customer_id','=','customers.id');
        $query->where('team_id', $request->user()->details->team_id);
        $query->whereIn('users.id', $request->all());
        $query->orWhere(function($query) use ($request)
        {
            $query->whereNotIn('users.id',$request->all())
                  ->where('users.deleted_at',NULL)
                  ->where('team_id', $request->user()->details->team_id);
        });
        $query->withTrashed();
        return response()->json($query->get(),200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        $data = $request->only(['name', 'email', 'password']);
        $data['password'] = bcrypt($data['password']);

        $res = User::create($data);

        $details = [
            'team_id' => $request->user()->details->team_id,
            'user_type' => $request->details['user_type'],
            'customer_id' => $request->details['customer_id'],
        ];
        
        $res->details()->create($details);

        return response()->json([
            'status' => (bool) $res,
            'data' => $res->selectRaw('
                users.*, 
                CASE
                    WHEN user_details.user_type = 1 THEN "Administrador"
                    WHEN user_details.user_type = 2 THEN "Vendedor"
                    ELSE "Cliente"
                END as user_type,
                customers.name as customer
            ')
            ->join('user_details','user_details.user_id','=','users.id')
            ->leftJoin('customers','user_details.customer_id','=','customers.id')
            ->with('details.team')->find($res->id),
            'message' => $res ? trans('global.created', [
                'item' => trans('global.user')
            ]) : trans('global.error_created', [
                'item' => trans('global.user')
            ])
        ]);
    }
    
    public function login(Request $request)
    {
        $response = ['status' => false, 'message' => 'Correo o contraseña equivocados'];

        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = User::with('details.team')->find(Auth::user()->id);
            $scopes = [];
            /*foreach ($user->user_permissions as $permission) {
                $scopes[] = $permission->permission->permission;
            }*/
            $response = [
                'status' => true,
                'user' => $user,
                'token' => Auth::user()->createToken('app', $scopes)->accessToken,
                'message' => 'Bienvenido '.$user->name
            ];
        }

        return response()->json($response);
    }

    public function update(Request $request, User $user)
    {
        $status = $user->update(
            $request->only(['name','email'])
        );

        $user->details()->update([
            'user_type' => $request->details['user_type'],
            'customer_id' => $request->details['customer_id']
        ]);

        return response()->json([
            'status' => $status,
            'data' => 
            $user->selectRaw('
                users.*, 
                CASE
                    WHEN user_details.user_type = 1 THEN "Administrador"
                    WHEN user_details.user_type = 2 THEN "Vendedor"
                    ELSE "Cliente"
                END as user_type,
                customers.name as customer
            ')
            ->join('user_details','user_details.user_id','=','users.id')
            ->leftJoin('customers','user_details.customer_id','=','customers.id')
            ->with('details.team')->find($user->id),
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.user')
            ]) : trans('global.error_updated', [
                'item' => trans('global.user')
            ])
        ]);
    }
    
    public function settings(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        $data = $request->only(['name','email']);

        if (isset($request->n_password)){
            $validator = Validator::make($request->all(), [
                'password' => 'required',
                'n_password' => 'required|min:6',
                'c_password' => 'required|same:n_password',
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            $status = 401;
            $response = ['error' => ['password'=>['La contraseña es incorrecta']]];
            if (Auth::guard('web')->attempt([
                'email' => $user->email,
                'password' => $request->password
            ])) {
                $data['password'] = bcrypt($request->n_password);
            }
            else return response()->json($response, $status);
        }
        
        $status = $user->update($data);

        return response()->json([
            'status' => $status,
            'data' => $user->with('details.team')->find($user->id),
            'message' => $status ? trans('global.updated', [
                'item' => trans('global.user')
            ]) : trans('global.error_updated', [
                'item' => trans('global.user')
            ])
        ]);
    }
    
    public function destroy(User $user)
    {
        $status = $user->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? trans('global.deleted', [
                'item' => trans('global.user')
            ]) : trans('global.error_deleted', [
                'item' => trans('global.user')
            ])
        ]);
    }
}
