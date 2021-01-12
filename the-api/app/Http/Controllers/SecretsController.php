<?php

namespace App\Http\Controllers;

use App\Models\Secret;
use Illuminate\Http\Request;

class SecretsController extends Controller
{
    public function index()
    {
        return Secret::all();
    }
}
