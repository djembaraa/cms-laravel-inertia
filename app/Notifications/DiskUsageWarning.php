<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DiskUsageWarning extends Notification
{
    use Queueable;

    public function __construct(
        public float $usageMB,
        public float $limitMB
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title'   => 'Disk usage warning',
            'message' => sprintf(
                'Disk usage sudah mencapai %.2f MB dari limit %.2f MB.',
                $this->usageMB,
                $this->limitMB
            ),
            'type'    => 'disk_warning',
        ];
    }
}
