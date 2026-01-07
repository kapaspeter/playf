import type { APIRoute } from 'astro';
import prisma from '../../lib/prisma';
import { sendConfirmationEmail } from '../../utils/email';

const VALID_TIME_SLOTS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
const MAX_PARTICIPANTS = 10;
const MAX_RESERVATIONS_PER_DAY = 6;

export const GET: APIRoute = async ({ url }) => {
  const date = url.searchParams.get('date');
  if (!date) {
    return new Response(JSON.stringify({ message: 'Date is required' }), { status: 400 });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: { date, status: { not: 'CANCELLED' } },
      select: { time: true }
    });

    const unavailableSlots = reservations.map(r => r.time);
    
    return new Response(JSON.stringify({ unavailableSlots }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching availability' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, date, time, participants, package: pkg } = data;

    if (!name || !email || !phone || !date || !time || !participants || !pkg) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const participantCount = parseInt(participants.toString());
    if (participantCount > MAX_PARTICIPANTS) {
      return new Response(JSON.stringify({ message: `Maximum ${MAX_PARTICIPANTS} participants allowed` }), { status: 400 });
    }

    if (!VALID_TIME_SLOTS.includes(time)) {
      return new Response(JSON.stringify({ message: 'Invalid time slot' }), { status: 400 });
    }

    // Check if day is blocked by admin
    const isBlocked = await prisma.blockedDay.findUnique({
      where: { date }
    });

    if (isBlocked) {
      return new Response(
        JSON.stringify({ message: 'This day is unavailable for reservations' }),
        { status: 400 }
      );
    }

    const existingReservations = await prisma.reservation.findMany({
      where: { date, status: { not: 'CANCELLED' } }
    });

    if (existingReservations.length >= MAX_RESERVATIONS_PER_DAY) {
      return new Response(JSON.stringify({ message: 'This day is fully booked' }), { status: 400 });
    }

    if (existingReservations.some(r => r.time === time)) {
      return new Response(JSON.stringify({ message: 'This time slot is already booked' }), { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        date,
        time,
        participants: participantCount,
        package: pkg,
      },
    });

    try {
      await sendConfirmationEmail(email, name, {
        date,
        time,
        participants: participantCount,
        package: pkg,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email', emailError);
    }

    return new Response(
      JSON.stringify({ message: 'Reservation created successfully', reservation }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating reservation:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};
