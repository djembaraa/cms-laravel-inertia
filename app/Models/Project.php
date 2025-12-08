<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'media_path',
        'techstack',
        'views',
        'disk_usage',
    ];

    protected $casts = [
        'techstack' => 'array', // otomatis jadi array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
