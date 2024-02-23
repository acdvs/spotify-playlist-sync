import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(`token-${params.side}`);
  const token = cookie && (JSON.parse(cookie.value) as AccessToken);

  return Response.json(token || null);
}
