<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SecuritySettingsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Settings/Security', [
            'user' => $request->user(),
        ]);
    }

    public function updateEmail(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'email'    => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['required', 'string'],
        ]);

        if (! Hash::check($data['password'], $user->password)) {
            return back()->withErrors([
                'password' => 'Password saat ini tidak cocok.',
            ]);
        }

        $user->email = $data['email'];
        $user->email_verified_at = null;
        $user->save();

        if (method_exists($user, 'sendEmailVerificationNotification')) {
            $user->sendEmailVerificationNotification();
        }

        return back()->with('email_success', 'Email berhasil diubah. Silakan cek email baru untuk verifikasi.');
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password'      => ['required', 'current_password'],
            'password'              => ['required', 'confirmed', 'min:8'],
        ]);

        $user->password = Hash::make($data['password']);
        $user->save();

        return back()->with('password_success', 'Password berhasil diubah.');
    }
}
