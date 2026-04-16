import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { OAuthCallbackContent } from './_components/oauth-callback-content';

/**
 * Main entry point for the OAuth Callback page.
 * Uses Suspense to handle the searchParams extraction in a client component.
 */
export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<OAuthCallbackSkeleton />}>
      <OAuthCallbackContent />
    </Suspense>
  );
}

/**
 * Skeleton fallback for the callback page to maintain UI consistency during load.
 */
function OAuthCallbackSkeleton() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 p-6 space-y-8">
      <div className="relative">
        <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full opacity-20" />
      </div>
      <div className="space-y-4 w-full flex flex-col items-center">
        <Skeleton className="h-8 w-48 opacity-20" />
        <Skeleton className="h-4 w-64 opacity-20" />
      </div>
      <Skeleton className="h-1 w-40 sm:w-48 opacity-20" />
    </div>
  );
}