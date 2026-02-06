import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// Specific skeleton for cards
function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-2xl bg-muted", className)} {...props} />;
}

// Skeleton for quick action cards
function QuickActionCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border border-border/30 bg-card min-h-[110px] sm:min-h-[120px] w-full">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-muted animate-pulse mb-2" />
      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
    </div>
  );
}

// Skeleton for garden widget
function GardenWidgetSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-16 h-16 bg-muted rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>
        <div className="h-8 w-16 bg-muted rounded-lg" />
      </div>
      <div className="h-4 bg-muted rounded w-3/4 mb-3" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-12" />
        </div>
        <div className="h-1.5 bg-muted rounded-full" />
      </div>
    </div>
  );
}

// Skeleton for journal entries
function JournalEntrySkeleton() {
  return (
    <div className="card-elevated p-4 space-y-2 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="h-3 bg-muted rounded w-32" />
        <div className="h-6 w-6 bg-muted rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-4/5" />
        <div className="h-4 bg-muted rounded w-3/5" />
      </div>
      <div className="h-3 bg-muted rounded w-20 mt-2" />
    </div>
  );
}

export { Skeleton, SkeletonCard, QuickActionCardSkeleton, GardenWidgetSkeleton, JournalEntrySkeleton };
