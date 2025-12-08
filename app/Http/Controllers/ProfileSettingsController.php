<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileSettingsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Settings/Profile', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'display_name' => ['nullable', 'string', 'max:255'],
            'avatar'       => ['nullable', 'image', 'max:2048'], // 2MB
            'project_logo' => ['nullable', 'image', 'max:4096'], // 4MB
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $avatarPath;
        }

        if ($request->hasFile('project_logo')) {
            if ($user->project_logo) {
                Storage::disk('public')->delete($user->project_logo);
            }
            $logoPath = $request->file('project_logo')->store('logos', 'public');
            $data['project_logo'] = $logoPath;
        }

        $user->update($data);

        return back()->with('success', 'Profile settings updated.');
    }
}
