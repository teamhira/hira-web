import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Custom hook to handle the OAuth redirection logic.
 */
export function useOAuthCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) return;

    let redirectUri = '';
    
    // Support for future mobile integrations (SwiftUI/Kotlin)
    if (state?.startsWith('ios:')) {
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('ios:', '')}`;
    } else if (state?.startsWith('android:')) {
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('android:', '')}`;
    }

    if (redirectUri) {
      const timer = setTimeout(() => {
        window.location.href = redirectUri;
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Logic for web flow can be added here
      console.info('Handling Web OAuth flow. Code:', code);
    }
  }, [searchParams]);

  return {
    searchParams
  };
}
