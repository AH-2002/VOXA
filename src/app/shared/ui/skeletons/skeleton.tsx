import { Skeleton } from "@/components/ui/skeleton";

export function PictureSkeleton() {
  return (
    <Skeleton className="h-12 w-12 rounded-full bg-gray-400/50 animate-pulse" />
  );
}

export function LineSkeleton() {
  return <Skeleton className="h-4 w-[200px] bg-gray-400/50 animate-pulse" />;
}

export function SearchSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-3 px-4 py-3">
          <PictureSkeleton />
          <div className="flex-1 space-y-2 py-1">
            <LineSkeleton />
          </div>
        </div>
      ))}
    </>
  );
}
