import prisma from '@/lib/prisma'; // Import our Prisma client

// Handler for GET requests (to retrieve the current count)
export async function GET() {
  try {
    // Find the single VisitorCount record.
    // We expect only one record to exist (with id=1).
    let visitorCount = await prisma.visitorCount.findUnique({
      where: { id: 1 },
    });

    if (!visitorCount) {
      // If no record exists (first time accessing), create it with count = 0
      visitorCount = await prisma.visitorCount.create({
        data: { id: 1, count: 0 },
      });
    }

    // Return the current count
    return new Response(JSON.stringify({ count: visitorCount.count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve visitor count' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handler for POST requests (to increment the count)
export async function POST() {
  try {
    // Upsert: Try to update the record with id=1, if it doesn't exist, create it.
    const updatedVisitorCount = await prisma.visitorCount.upsert({
      where: { id: 1 }, // Look for a record with id 1
      update: {
        count: {
          increment: 1, // If found, increment its 'count' by 1
        },
      },
      create: {
        id: 1, // If not found, create a new record with id 1
        count: 1, // Set its initial count to 1
      },
    });

    // Return the new count
    return new Response(JSON.stringify({ count: updatedVisitorCount.count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return new Response(JSON.stringify({ error: 'Failed to increment visitor count' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}