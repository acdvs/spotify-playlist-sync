import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import type { SideType } from '@/store';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  cookies().delete(`token-${params.side}`);

  return Response.json({ status: 200 });
}
