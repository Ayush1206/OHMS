// app/login/route.ts

import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}

const dummyUsers: User[] = [
  { username: 'admin', password: 'adminpass', role: 'admin' },
  { username: 'teacher', password: 'teacherpass', role: 'teacher' },
  { username: 'student', password: 'studentpass', role: 'student' },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Find user based on the provided credentials
  const user = dummyUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // If user is found, set a cookie with the user's role
    const response = NextResponse.json({ message: 'Login successful', role: user.role });
    
    // Set cookie for role
    setCookie('user_role', user.role, {
      req: request,
      res: response,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
