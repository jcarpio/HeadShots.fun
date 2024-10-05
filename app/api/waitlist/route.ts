import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Asegúrate de tener la instancia de Prisma configurada

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validar el email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    }

    // Añadir el email a la lista de espera
    await prisma.waitlist.create({
      data: {
        email,
        processed: false, // Campo por defecto
      },
    });

    return NextResponse.json({ message: 'Email added to the waitlist.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add email to the waitlist.' }, { status: 500 });
  }
}
