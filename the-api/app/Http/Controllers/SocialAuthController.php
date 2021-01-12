<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('google')->user();

        if (!$user) {
            return response(['message' => 'Could not authenticate'], 401);
        }

        $dbUser = User::updateOrCreate(['email' => $user->getEmail()], ['name' => $user->getName(), 'email_verified_at' => now()]);

        Auth::login($dbUser);

        return redirect(RouteServiceProvider::HOME);
    }
}
