import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type PageSkeletonVariant = 'home' | 'list' | 'detail' | 'cards' | 'profile';

interface PageSkeletonProps {
  variant?: PageSkeletonVariant;
  className?: string;
}

export function PageSkeleton({ variant = 'home', className }: PageSkeletonProps) {
  return (
    <div className={cn('min-h-screen bg-background p-4 pb-24', className)}>
      {variant === 'home' && <HomeSkeleton />}
      {variant === 'list' && <ListSkeleton />}
      {variant === 'detail' && <DetailSkeleton />}
      {variant === 'cards' && <CardsSkeleton />}
      {variant === 'profile' && <ProfileSkeleton />}
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Main card */}
      <Skeleton className="h-40 w-full rounded-2xl" />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>

      {/* Section title */}
      <Skeleton className="h-5 w-32 mt-4" />

      {/* Cards row */}
      <div className="flex gap-3 overflow-hidden">
        <Skeleton className="h-32 w-36 flex-shrink-0 rounded-xl" />
        <Skeleton className="h-32 w-36 flex-shrink-0 rounded-xl" />
        <Skeleton className="h-32 w-36 flex-shrink-0 rounded-xl" />
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Search */}
      <Skeleton className="h-11 w-full rounded-xl" />

      {/* List items */}
      <div className="space-y-3 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-xl">
            <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <Skeleton className="h-8 w-20" />

      {/* Hero image */}
      <Skeleton className="h-48 w-full rounded-2xl" />

      {/* Title section */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Content blocks */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Action button */}
      <Skeleton className="h-12 w-full rounded-xl mt-6" />
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <Skeleton className="h-6 w-40" />

      {/* Grid of cards */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 bg-card rounded-xl">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>

      {/* Settings list */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
