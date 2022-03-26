import { NextResponse } from 'next/server';

export const middleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({ msg: 'Undefined' });
  }
};
