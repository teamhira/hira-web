import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
    const clientSecret = process.env.QURAN_FOUNDATION_CLIENT_SECRET;
    const oauthUrl = process.env.QURAN_FOUNDATION_OAUTH_URL;

    if (!clientId || !clientSecret || !oauthUrl) {
      return NextResponse.json({ error: 'OAuth configuration missing' }, { status: 500 });
    }

    const tokenUrl = `${oauthUrl}/oauth2/token`;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ [QF Refresh] OAuth Error:', data);
      return NextResponse.json(data, { status: response.statusCode || 400 });
    }

    // Optionally fetch user info if needed, but usually refresh just gives new tokens.
    // However, for consistency with our exchange route, we return the same structure.
    
    return NextResponse.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken, // fallback to old one if not rotated
      idToken: data.id_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
      user: null // Refresh usually doesn't return user info in the token response
    });

  } catch (error) {
    console.error('❌ [QF Refresh] Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
