import type { APIRoute } from 'astro';
import prisma from '../../lib/prisma';

export const GET: APIRoute = async ({ url }) => {
  const year = url.searchParams.get('year');
  const month = url.searchParams.get('month');

  if (!year || !month) {
    return new Response(JSON.stringify({ message: 'Year and Month are required' }), { status: 400 });
  }

  try {
    const prefix = `${year}-${month}`;
    
    // Fetch reservations
    const reservations = await prisma.reservation.findMany({
      where: {
        date: { startsWith: prefix },
        status: { not: 'CANCELLED' }
      },
      select: { date: true }
    });

    // Fetch blocked days
    const blockedDays = await prisma.blockedDay.findMany({
      where: {
        date: { startsWith: prefix }
      },
      select: { date: true }
    });

    const availability: Record<string, number> = {};
    
    // Add reservations counts
    reservations.forEach(res => {
      availability[res.date] = (availability[res.date] || 0) + 1;
    });

    // Blocked days are always "full" (6 dots/slots)
    blockedDays.forEach(blocked => {
      availability[blocked.date] = 6;
    });
    
    return new Response(JSON.stringify({ availability }), { status: 200 });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return new Response(JSON.stringify({ message: 'Error fetching availability' }), { status: 500 });
  }
};