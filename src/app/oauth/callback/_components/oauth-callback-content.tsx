'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { useOAuthCallback } from '../_hooks/use-oauth-callback';

/**
 * Clean UI component for the OAuth Callback.
 */
export function OAuthCallbackContent() {
  // Use the extracted hook for logic
  const { status, errorDetails } = useOAuthCallback();

  const getStatusMessage = () => {
    switch (status) {
      case 'initializing':
        return 'Initializing authentication...';
      case 'redirecting':
        return 'Account verified. Redirecting you back to Hira...';
      case 'server_error':
        return `Authentication Error: ${errorDetails || 'An error occurred on the server.'}`;
      case 'error_missing_code':
        return 'Authentication failed. No authorization code was received.';
      case 'error_redirect_failed':
        return 'Could not redirect you back to the app. Please try opening Hira manually.';
      case 'web_flow':
        return 'Verification successful. You can close this window.';
      default:
        return 'Verifying your account details...';
    }
  };

  const isError = status.startsWith('error') || status === 'server_error';

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 text-white p-6 sm:p-8 overflow-hidden relative">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] sm:max-w-[500px] aspect-square bg-emerald-500/15 rounded-full blur-[60px] sm:blur-[120px] opacity-50 sm:opacity-100" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center w-full max-w-[280px] sm:max-w-sm mx-auto space-y-8 sm:space-y-10 text-center"
      >
        <div className="relative group">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-t-2 border-emerald-500 border-r-2 border-r-emerald-500/20 border-b-2 border-b-emerald-500/5 border-l-2 border-l-emerald-500/40"
          />
          <div className="absolute inset-0 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${isError ? 'text-rose-500' : 'text-white'}`}
          >
            {isError ? 'Verification Error' : 'Verifying Account'}
          </motion.h1>
          <motion.p 
            key={status} // Key ensures animation re-triggers on status change
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm sm:text-base leading-relaxed balance ${isError ? 'text-rose-400/80' : 'text-zinc-400'}`}
          >
            {getStatusMessage()}
          </motion.p>
        </div>

        {/* Progress indicator */}
        <div className="w-full flex justify-center">
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-1 bg-zinc-800 rounded-full w-40 sm:w-48 overflow-hidden relative"
          >
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-1/2 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-xs sm:text-sm text-zinc-500"
        >
          Taking too long? <Button variant="link" size="sm" onClick={() => window.location.reload()} className="text-emerald-500 h-auto p-0 focus-visible:ring-emerald-500/20">click here to refresh</Button>
        </motion.div>
      </motion.div>

      {/* Persistent Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-1 select-none grayscale-[0.5] opacity-30"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-500">Authenticated by</span>
        <span className="text-sm font-bold tracking-widest text-emerald-500/80">HIRA</span>
      </motion.div>
    </div>
  );
}
