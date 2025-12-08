<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeSettingsController extends Controller
{
    public function index()
    {
        $record = Setting::where('key', 'theme')->first();

        $theme = $record?->value ?? [
            'primary_color' => '#111827', // bg/heading
            'accent_color'  => '#4F46E5', // button
            'font_family'   => 'Inter',
        ];

        return Inertia::render('Settings/Theme', [
            'theme' => $theme,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'primary_color' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'accent_color'  => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'font_family'   => ['required', 'string', 'max:50'],
        ]);

        Setting::updateOrCreate(
            ['key' => 'theme'],
            ['value' => $data]
        );

        return back()->with('success', 'Theme settings updated.');
    }
}
