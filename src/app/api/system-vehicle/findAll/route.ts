import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://maintenancesystembc-production.up.railway.app/api/v1';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1'; 

    try {
        const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch vehicles from external API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        return NextResponse.json(
            { error: 'Error fetching data from external API' },
            { status: 500 }
        );
    }
}