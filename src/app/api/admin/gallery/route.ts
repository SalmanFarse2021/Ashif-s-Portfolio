
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'portfolio');
        const gallery = await db.collection('gallery').findOne({});

        return NextResponse.json({ images: gallery?.data || [] });
    } catch (error: any) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'portfolio');

        await db.collection('gallery').updateOne(
            {},
            { $set: { data: body, updatedAt: new Date() } },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
