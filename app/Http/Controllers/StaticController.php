<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StaticController extends Controller
{
    public function index()
    {
        $totalPosts = Post::count();
        $totalProjects = Project::count();

        $totalPostViews = (int) Post::sum('views');
        $totalProjectViews = (int) Project::sum('views');
        $totalVisits = $totalPostViews + $totalProjectViews;

        $diskLimitMb = 512; 
        $diskUsageBytes = 0;

        try {
            $disk = Storage::disk('public');
            $files = $disk->allFiles();

            foreach ($files as $path) {
                $diskUsageBytes += $disk->size($path);
            }
        } catch (\Throwable $e) {
            $diskUsageBytes = 0;
        }

        $diskUsageMb = round($diskUsageBytes / 1024 / 1024, 2);
        $diskUsagePercent = $diskLimitMb > 0
            ? min(100, round($diskUsageMb / $diskLimitMb * 100, 1))
            : 0;

        $diskWarning = $diskUsagePercent >= 90;

        $topPosts = Post::orderByDesc('views')
            ->take(5)
            ->get()
            ->map(function (Post $post) {
                return [
                    'id'    => $post->id,
                    'title' => $post->title,
                    'views' => (int) $post->views,
                ];
            });

        $topProjects = Project::orderByDesc('views')
            ->take(5)
            ->get()
            ->map(function (Project $project) {
                return [
                    'id'    => $project->id,
                    'title' => $project->title,
                    'views' => (int) $project->views,
                ];
            });

        return Inertia::render('Static/Index', [
            'totals' => [
                'posts'          => $totalPosts,
                'projects'       => $totalProjects,
                'post_views'     => $totalPostViews,
                'project_views'  => $totalProjectViews,
                'total_visits'   => $totalVisits,
                'disk_usage_mb'  => $diskUsageMb,
                'disk_limit_mb'  => $diskLimitMb,
                'disk_percent'   => $diskUsagePercent,
                'disk_warning'   => $diskWarning,
            ],
            'topPosts'    => $topPosts,
            'topProjects' => $topProjects,
        ]);
    }
}
