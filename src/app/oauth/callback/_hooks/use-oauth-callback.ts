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
      // Redirect to the custom scheme registered in iOS Info.plist
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('ios:', '')}`;
    } else if (state?.startsWith('android:')) {
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('android:', '')}`;
    }

    if (redirectUri) {
      console.log(`🚀 [OAuthCallback] Attempting redirect to: ${redirectUri}`);
      const timer = setTimeout(() => {
        // Using replace to avoid history pollution and ensure a cleaner redirect in mobile browsers
        window.location.replace(redirectUri);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      console.warn('⚠️ [OAuthCallback] No redirect URI determined. state:', state);
    }
  }, [searchParams]);

  return {
    searchParams
  };
}
