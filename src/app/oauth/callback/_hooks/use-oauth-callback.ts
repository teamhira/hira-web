import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Custom hook to handle the OAuth redirection logic.
 */
export function useOAuthCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('initializing');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    console.log('🔍 [OAuthCallback] Raw Search Params:', {
      code: code ? 'PRESENT' : 'MISSING',
      state: state || 'MISSING'
    });

    if (!code) {
      console.error('❌ [OAuthCallback] No code found in URL search params');
      setStatus('error_missing_code');
      return;
    }

    let redirectUri = '';
    let platform = 'web';
    
    // Support for mobile integrations
    if (state?.startsWith('ios:')) {
      platform = 'ios';
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('ios:', '')}`;
    } else if (state?.startsWith('android:')) {
      platform = 'android';
      redirectUri = `hira://oauth/callback?code=${code}&state=${state.replace('android:', '')}`;
    }

    if (redirectUri) {
      console.log(`🚀 [OAuthCallback] Identified Platform: ${platform.toUpperCase()}`);
      console.log(`🔗 [OAuthCallback] Calculated Redirect URI: ${redirectUri}`);
      
      setStatus('redirecting');
      
      const timer = setTimeout(() => {
        console.log('📬 [OAuthCallback] Executing window.location.replace...');
        try {
          window.location.replace(redirectUri);
        } catch (err) {
          console.error('💥 [OAuthCallback] Redirect failed:', err);
          setStatus('error_redirect_failed');
        }
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      console.warn('⚠️ [OAuthCallback] No mobile redirect detected. State:', state);
      setStatus('web_flow');
    }
  }, [searchParams]);

  return {
    searchParams,
    status
  };
}
