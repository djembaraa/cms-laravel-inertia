<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')
            ->latest()
            ->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'  => ['required', 'string', 'max:255'],
            'body'   => ['required', 'string'],
            'footer' => ['nullable', 'string'],
            'media'  => ['nullable', 'image', 'max:2048'], // 2MB
        ]);

        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('posts', 'public');
        }

        Post::create([
            'user_id'        => $request->user()->id,
            'title'          => $data['title'],
            'body'           => $data['body'],
            'footer'         => $data['footer'] ?? null,
            'media_path'     => $mediaPath,
            'views'          => 0,
            'likes_count'    => 0,
            'comments_count' => 0,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created.');
    }

    public function show(Post $post)
    {
        $post->increment('views');
        
        return Inertia::render('Posts/Show', [
        'post' => $post->fresh(),
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title'  => ['required', 'string', 'max:255'],
            'body'   => ['required', 'string'],
            'footer' => ['nullable', 'string'],
            'media'  => ['nullable', 'image', 'max:2048'],
        ]);

        $mediaPath = $post->media_path;

        if ($request->hasFile('media')) {
            if ($mediaPath) {
                Storage::disk('public')->delete($mediaPath);
            }
            $mediaPath = $request->file('media')->store('posts', 'public');
        }

        $post->update([
            'title'      => $data['title'],
            'body'       => $data['body'],
            'footer'     => $data['footer'] ?? null,
            'media_path' => $mediaPath,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post updated.');
    }

    public function destroy(Post $post)
    {
        if ($post->media_path) {
            Storage::disk('public')->delete($post->media_path);
        }

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);

        if (! empty($ids)) {
            $posts = Post::whereIn('id', $ids)->get();

            foreach ($posts as $post) {
                if ($post->media_path) {
                    Storage::disk('public')->delete($post->media_path);
                }
                $post->delete();
            }
        }

        return redirect()->route('posts.index')->with('success', 'Selected posts deleted.');
    }
}
