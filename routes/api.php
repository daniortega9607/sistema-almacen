<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'UserController@login');
Route::put('/users/settings/{user}', 'UserController@settings');
Route::post('/teams', 'TeamController@store');


Route::group(['middleware' => ['auth:api']], function() {
    Route::post('/suppliers/init', 'SupplierController@init');
    Route::resource('/suppliers', 'SupplierController');
    Route::post('/customers/init', 'CustomerController@init');
    Route::resource('/customers', 'CustomerController');
    Route::post('/offices/init', 'OfficeController@init');
    Route::resource('/offices', 'OfficeController');
    Route::post('/products/init', 'ProductController@init');
    Route::resource('/products', 'ProductController');
    Route::post('/fabrics/init', 'FabricController@init');
    Route::resource('/fabrics', 'FabricController');
    Route::post('/designs/init', 'DesignController@init');
    Route::resource('/designs', 'DesignController');
    Route::post('/colors/init', 'ColorController@init');
    Route::resource('/colors', 'ColorController');
    Route::post('/stocks/init', 'StockController@init');
    Route::resource('/stocks', 'StockController');
    Route::resource('/stock_details', 'StockDetailController');
    Route::post('/users/init', 'UserController@init');
    Route::resource('/users', 'UserController');
});