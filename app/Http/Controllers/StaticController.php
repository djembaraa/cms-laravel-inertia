<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Inertia\Inertia;

class StaticController extends Controller
{
    public function index()
    {
        $totalPosts     = Post::count();
        $totalProjects  = Project::count();
        $totalPostViews = Post::sum('views');
        $totalProjViews = Project::sum('views');
        $totalVisitors  = $totalPostViews + $totalProjViews;
        $totalDiskUsage = Project::sum('disk_usage'); // byte

        $topPosts = Post::orderBy('views', 'desc')->take(10)->get(['id', 'title', 'views']);
        $topProjects = Project::orderBy('views', 'desc')->take(10)->get(['id', 'title', 'views', 'disk_usage']);

        return Inertia::render('Static/Index', [
            'totalPosts'     => $totalPosts,
            'totalProjects'  => $totalProjects,
            'totalVisitors'  => $totalVisitors,
            'totalDiskUsage' => $totalDiskUsage,
            'topPosts'       => $topPosts,
            'topProjects'    => $topProjects,
        ]);
    }
}
