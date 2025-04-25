import { ChangeRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Activity } from "lucide-react";

interface RecentActivityProps {
  changes: ChangeRecord[];
}

export function RecentActivity({ changes }: RecentActivityProps) {
  return (
    <div className="space-y-4">
      {changes.map((change) => (
        <div key={change.id} className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{change.description}</p>
            <p className="text-xs text-muted-foreground">
              By {change.userName} • {formatDistanceToNow(new Date(change.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}