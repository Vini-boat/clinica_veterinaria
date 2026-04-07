# Clinica Veterinaria

Next.js app using Supabase SSR auth with Google login.

## Environment variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
```

## Google provider setup

1. In Google Cloud Console, create an OAuth Client ID of type Web application.
2. Add authorized JavaScript origins:
	- `http://localhost:3000`
	- your production app origin
3. In Supabase Dashboard, open Authentication > Providers > Google.
4. Paste Google client ID and client secret.
5. Add redirect URL allow-list entries in Supabase for:
	- `http://localhost:3000/auth/callback`
	- your production callback URL
6. Ensure required scopes are configured in Google Auth Platform:
	- `openid`
	- `.../auth/userinfo.email`
	- `.../auth/userinfo.profile`

## Auth routes

- Login page: `/auth/login`
- OAuth callback: `/auth/callback`
- Callback error page: `/auth/auth-code-error`

The home route `/` is protected and redirects unauthenticated users to `/auth/login?next=/`.

## Local development

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000/auth/login` and click Login With Google.

## Manual verification checklist

1. Logged out visit to `/` redirects to `/auth/login`.
2. Clicking Login With Google redirects to Google consent screen.
3. Successful consent returns through `/auth/callback` and lands on `/`.
4. If callback code exchange fails, user is sent to `/auth/auth-code-error`.
