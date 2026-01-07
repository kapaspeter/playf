import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      cookies.set('admin_session', adminPassword, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });

      return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};
