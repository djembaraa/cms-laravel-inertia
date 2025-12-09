<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $owner = User::first();

        $popularPosts = Post::orderByDesc('views')
            ->take(6)
            ->get();

        $recentPosts = Post::latest()
            ->paginate(6)
            ->through(function (Post $post) {
                return [
                    'id'         => $post->id,
                    'title'      => $post->title,
                    'excerpt'    => str($post->body)->limit(200),
                    'views'      => $post->views,
                    'created_at' => $post->created_at?->toIso8601String(),
                ];
            });

        $projects = Project::latest()
            ->take(6)
            ->get()
            ->map(function (Project $project) {
                return [
                    'id'          => $project->id,
                    'title'       => $project->title,
                    'description' => str($project->description)->limit(160),
                    'views'       => $project->views,
                    'created_at'  => $project->created_at?->toIso8601String(),
                    'media_path'  => $project->media_path,
                    'techstack'   => $project->techstack,
                ];
            });

        return Inertia::render('Blog/Home', [
            'owner' => [
                'name'          => $owner?->display_name ?? $owner?->name ?? 'My Blog',
                'subtitle'      => 'Personal CMS & Portfolio',
                'avatar'        => $owner?->avatar,
                'project_logo'  => $owner?->project_logo,
            ],
            'popularPosts' => $popularPosts->map(function (Post $post) {
                return [
                    'id'         => $post->id,
                    'title'      => $post->title,
                    'excerpt'    => str($post->body)->limit(140),
                    'views'      => $post->views,
                    'created_at' => $post->created_at?->toIso8601String(),
                ];
            }),
            'recentPosts' => $recentPosts,  // paginator
            'projects'    => $projects,
        ]);
    }

    public function showPost(Post $post)
    {
        $post->increment('views');

        $owner = User::first();

        return Inertia::render('Blog/PostShow', [
            'owner' => [
                'name'         => $owner?->display_name ?? $owner?->name ?? 'My Blog',
                'project_logo' => $owner?->project_logo,
            ],
            'post' => [
                'id'         => $post->id,
                'title'      => $post->title,
                'body'       => $post->body,
                'media_path' => $post->media_path,
                'views'      => $post->views,
                'created_at' => $post->created_at?->toIso8601String(),
            ],
        ]);
    }

    public function showProject(Project $project)
    {
        $project->increment('views');

        $owner = User::first();

        return Inertia::render('Blog/ProjectShow', [
            'owner' => [
                'name'         => $owner?->display_name ?? $owner?->name ?? 'My Blog',
                'project_logo' => $owner?->project_logo,
            ],
            'project' => [
                'id'          => $project->id,
                'title'       => $project->title,
                'description' => $project->description,
                'media_path'  => $project->media_path,
                'techstack'   => $project->techstack,
                'views'       => $project->views,
                'created_at'  => $project->created_at?->toIso8601String(),
            ],
        ]);
    }
}
