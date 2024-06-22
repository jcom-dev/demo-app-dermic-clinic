import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: '/dash-admin/home',
}