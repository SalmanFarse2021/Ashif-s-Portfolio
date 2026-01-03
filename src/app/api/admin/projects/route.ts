import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || 'portfolio');
        const projects = await db.collection('projects').findOne({});

        return NextResponse.json({ projects: projects?.data || [] });
    } catch (error: any) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({
            error: 'Failed to fetch projects',
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

        const result = await db.collection('projects').updateOne(
            {},
            { $set: { data: body, updatedAt: new Date() } },
            { upsert: true }
        );

        console.log('Projects saved successfully:', result);
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('Error saving projects:', error);
        return NextResponse.json({
            error: 'Failed to save projects',
            details: error.message
        }, { status: 500 });
    }
}
