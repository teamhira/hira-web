import { NextResponse } from 'next/server';

/**
 * Handle the OAuth2 session logout and token revocation for Quran Foundation.
 */
export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      // If no token is provided, we treat it as already logged out
      return NextResponse.json({ success: true, message: 'Already logged out' });
    }

    const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
    const clientSecret = process.env.QURAN_FOUNDATION_CLIENT_SECRET;
    const oauthUrl = process.env.QURAN_FOUNDATION_OAUTH_URL;

    if (!clientId || !clientSecret || !oauthUrl) {
      console.error('❌ QF OAuth Error: Environment variables are not configured correctly.');
      return NextResponse.json({ error: 'Internal OAuth configuration error' }, { status: 500 });
    }

    const revokeUrl = `${oauthUrl}/oauth2/revoke`;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log(`📡 Revoking token at: ${revokeUrl}`);

    // Revoke the refresh token on the OAuth server
    const revokeResponse = await fetch(revokeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        token: refreshToken,
        token_type_hint: 'refresh_token',
      }).toString(),
    });

    if (!revokeResponse.ok) {
      const errorData = await revokeResponse.json();
      console.warn('⚠️ Token revocation on server failed:', errorData);
      // We still return success: true because the client should clear its local session regardless
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully and token revoked' 
    });

  } catch (error) {
    console.error('❌ QF Logout Error:', error);
    // In case of error, we still suggest the client to clear local session
    return NextResponse.json({ error: 'Internal server error during logout' }, { status: 500 });
  }
}