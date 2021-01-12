<?php

use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', env('FRONTEND_URL') . str_replace(Request::url(), '', Request::fullUrl()));

Route::redirect(
    '/password-reset',
    env("FRONTEND_URL") . "/password-reset" . str_replace(Request::url(), '', Request::fullUrl())
)->name('password.reset');

Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirect']);

Route::get('/auth/google/callback', [SocialAuthController::class, 'callback']);
