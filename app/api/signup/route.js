import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/users";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "Signup successful" });
}
