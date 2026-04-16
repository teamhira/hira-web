import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Custom hook to handle the OAuth redirection logic.
 */
export function useOAuthCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('initializing');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get all potential params
    let code = searchParams.get('code');
    let state = searchParams.get('state');
    const errorCode = searchParams.get('error');
    const errorDesc = searchParams.get('error_description');

    console.log('🌐 [OAuthCallback] Full URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');

    if (errorCode) {
      console.error('❌ [OAuthCallback] Server returned error:', { errorCode, errorDesc });
      setErrorDetails(errorDesc || errorCode);
      setStatus('server_error');
      return;
    }

    // 2. Fallback to direct window parsing if searchParams is empty
    if (!code && typeof window !== 'undefined' && !errorCode) {
      const params = new URLSearchParams(window.location.search);
      code = params.get('code');
      state = params.get('state');
      // If we found a code here, it was likely a hydration delay
      if (code) console.log('💡 [OAuthCallback] Recovered code from window.location.search');
    }

    console.log('🔍 [OAuthCallback] Params Evaluation:', {
      code: code ? 'PRESENT' : 'MISSING',
      state: state || 'MISSING',
      error: errorCode || 'NONE'
    });

    if (!code) {
      console.error('❌ [OAuthCallback] No code found in URL. Params:', typeof window !== 'undefined' ? window.location.search : 'N/A');
      setStatus('error_missing_code');
      return;
    }

    let redirectUri = '';
    let platform = 'web';
    
    // Support for mobile integrations
    if (state?.startsWith('ios:')) {
      platform = 'ios';
      const cleanState = state.replace('ios:', '');
      // Ensure we encode components if they contain special characters
      redirectUri = `hira://oauth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(cleanState)}`;
    } else if (state?.startsWith('android:')) {
      platform = 'android';
      const cleanState = state.replace('android:', '');
      redirectUri = `hira://oauth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(cleanState)}`;
    }

    if (redirectUri) {
      console.log(`🚀 [OAuthCallback] Identified Platform: ${platform.toUpperCase()}`);
      console.log(`🔗 [OAuthCallback] Attempting Redirect to: ${redirectUri}`);
      
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
    status,
    errorDetails
  };
}
