<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Notifications\DiskUsageWarning;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('user')->latest()->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'techstack'   => ['required', 'string'], // akan kita pecah jadi array
            'media'       => ['required', 'file', 'max:51200'], // 50MB
        ]);

        $mediaPath = $request->file('media')->store('projects', 'public');
        $diskUsage = $request->file('media')->getSize(); // byte

        Project::create([
            'user_id'     => $request->user()->id,
            'title'       => $data['title'],
            'description' => $data['description'],
            'media_path'  => $mediaPath,
            'techstack'   => $this->parseTechstack($data['techstack']),
            'views'       => 0,
            'disk_usage'  => $diskUsage,
        ]);

        $this->checkDiskUsageAndNotify($request->user());

        return redirect()->route('projects.index')->with('success', 'Project created.');
    }

    public function show(Project $project)
    {
        $project->increment('views');

        return Inertia::render('Projects/Show', [
        'project' => $project->fresh(),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'techstack'   => ['required', 'string'],
            'media'       => ['nullable', 'file', 'max:51200'],
        ]);

        $mediaPath = $project->media_path;
        $diskUsage = $project->disk_usage;

        if ($request->hasFile('media')) {
            if ($mediaPath) {
                Storage::disk('public')->delete($mediaPath);
            }
            $file = $request->file('media');
            $mediaPath = $file->store('projects', 'public');
            $diskUsage = $file->getSize();
        }

        $project->update([
            'title'       => $data['title'],
            'description' => $data['description'],
            'techstack'   => $this->parseTechstack($data['techstack']),
            'media_path'  => $mediaPath,
            'disk_usage'  => $diskUsage,
        ]);

        $this->checkDiskUsageAndNotify($request->user());


        return redirect()->route('projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        if ($project->media_path) {
            Storage::disk('public')->delete($project->media_path);
        }

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);

        if (! empty($ids)) {
            $projects = Project::whereIn('id', $ids)->get();

            foreach ($projects as $project) {
                if ($project->media_path) {
                    Storage::disk('public')->delete($project->media_path);
                }
                $project->delete();
            }
        }

        return redirect()->route('projects.index')->with('success', 'Selected projects deleted.');
    }

    private function parseTechstack(string $input): array
    {
        return array_values(array_filter(array_map('trim', explode(',', $input))));
    }

    private function checkDiskUsageAndNotify($user): void
    {
    $totalDisk = Project::sum('disk_usage'); // bytes
    $totalMB   = $totalDisk / 1024 / 1024;
    $limitMB   = 500; // misal limit 500 MB

        if ($totalMB >= $limitMB * 0.8) { // 80% ke atas
             $user->notify(new DiskUsageWarning($totalMB, $limitMB));
        }
    }
}
