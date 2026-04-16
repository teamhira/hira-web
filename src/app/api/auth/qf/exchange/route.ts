import { NextResponse } from 'next/server';

/**
 * Handle the OAuth2 Authorization Code exchange specifically for Quran Foundation.
 * This route follows standard OIDC/OAuth2 patterns with Client Secret Basic authentication.
 */
export async function POST(req: Request) {
  try {
    const { code, codeVerifier, redirectUri } = await req.json();

    if (!code || !codeVerifier || !redirectUri) {
      return NextResponse.json({ error: 'Missing required parameters: code, codeVerifier, or redirectUri' }, { status: 400 });
    }

    const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
    const clientSecret = process.env.QURAN_FOUNDATION_CLIENT_SECRET;
    const oauthUrl = process.env.QURAN_FOUNDATION_OAUTH_URL;

    if (!clientId || !clientSecret || !oauthUrl) {
      console.error('❌ QF OAuth Error: Environment variables are not configured correctly.');
      return NextResponse.json({ error: 'Internal OAuth configuration error' }, { status: 500 });
    }

    const tokenUrl = `${oauthUrl}/oauth2/token`;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log(`📡 Exchanging code for token at: ${tokenUrl}`);

    // 1. Exchange Code for Access Token & Refresh Token
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('❌ Token Exchange Failed:', tokenData);
      return NextResponse.json({ 
        error: tokenData.error_description || tokenData.error || 'Token exchange failed' 
      }, { status: tokenResponse.status });
    }

    // 2. Fetch User Profile from UserInfo Endpoint
    // As per OIDC specifications, the /userinfo endpoint provides the user's profile data.
    const userInfoUrl = `${oauthUrl}/oauth2/userinfo`;
    console.log(`👤 Fetching user info from: ${userInfoUrl}`);
    
    const userInfoResponse = await fetch(userInfoUrl, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    let userData = {};
    if (userInfoResponse.ok) {
      userData = await userInfoResponse.json();
    } else {
      console.warn('⚠️ UserInfo call failed, attempting to proceed without profile data.');
    }

    // 3. Return consolidated session data
    return NextResponse.json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      id_token: tokenData.id_token,
      expires_in: tokenData.expires_in,
      token_type: tokenData.token_type,
      user: userData,
    });

  } catch (error) {
    console.error('❌ QF Authorization Error:', error);
    return NextResponse.json({ error: 'Internal server error during authentication' }, { status: 500 });
  }
}