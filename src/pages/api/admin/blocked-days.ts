import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma';

const checkAuth = (cookies: any) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const authCookie = cookies.get('admin_session');
  return authCookie?.value === adminPassword;
};

export const GET: APIRoute = async ({ cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const blockedDays = await prisma.blockedDay.findMany({
      orderBy: { date: 'asc' }
    });
    return new Response(JSON.stringify(blockedDays), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching blocked days' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { date, reason } = await request.json();
    if (!date) return new Response(JSON.stringify({ message: 'Date is required' }), { status: 400 });

    const blockedDay = await prisma.blockedDay.create({
      data: { date, reason }
    });
    return new Response(JSON.stringify(blockedDay), { status: 201 });
  } catch (error) {
    console.error('Error blocking day:', error);
    return new Response(JSON.stringify({ message: 'Error blocking day' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ url, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const id = url.searchParams.get('id');
  if (!id) return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });

  try {
    await prisma.blockedDay.delete({
      where: { id: parseInt(id) }
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting blocked day' }), { status: 500 });
  }
};