import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'portfolio');
        const profile = await db.collection('profile').findOne({});

        return NextResponse.json({ profile: profile?.data || null });
    } catch (error: any) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({
            error: 'Failed to fetch profile',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'portfolio');

        const result = await db.collection('profile').updateOne(
            {},
            { $set: { data: body, updatedAt: new Date() } },
            { upsert: true }
        );

        console.log('Profile saved successfully:', result);
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('Error saving profile:', error);
        return NextResponse.json({
            error: 'Failed to save profile',
            details: error.message
        }, { status: 500 });
    }
}
