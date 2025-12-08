<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $popularPosts = Post::orderBy('views', 'desc')->take(5)->get();
        $recentPosts  = Post::latest()->take(5)->get();

        $popularProjects = Project::orderBy('views', 'desc')->take(5)->get();
        $recentProjects  = Project::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'popularPosts'    => $popularPosts,
            'recentPosts'     => $recentPosts,
            'popularProjects' => $popularProjects,
            'recentProjects'  => $recentProjects,
        ]);
    }
}
