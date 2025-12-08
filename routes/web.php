<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StaticController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\ThemeSettingsController;
use App\Http\Controllers\SecuritySettingsController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('posts', PostController::class);
    Route::delete('posts-bulk', [PostController::class, 'bulkDestroy'])->name('posts.bulk-destroy');

    Route::resource('projects', ProjectController::class);
    Route::delete('projects-bulk', [ProjectController::class, 'bulkDestroy'])->name('projects.bulk-destroy');


    Route::get('/static', [StaticController::class, 'index'])->name('static.index');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
     Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead'])->name('notifications.markAllRead');
    Route::post('/notifications/{id}/mark-read', [NotificationController::class, 'markRead'])->name('notifications.markRead');

    Route::get('/settings/profile', [ProfileSettingsController::class, 'index'])->name('settings.profile');
    Route::post('/settings/profile', [ProfileSettingsController::class, 'update'])->name('settings.profile.update');
    
    Route::get('/settings/theme', [ThemeSettingsController::class, 'index'])->name('settings.theme');
    Route::post('/settings/theme', [ThemeSettingsController::class, 'update'])->name('settings.theme.update');

     Route::get('/settings/security', [SecuritySettingsController::class, 'index'])->name('settings.security');
    Route::post('/settings/security/email', [SecuritySettingsController::class, 'updateEmail'])->name('settings.security.email');
    Route::post('/settings/security/password', [SecuritySettingsController::class, 'updatePassword'])->name('settings.security.password');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
