import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "@/lib/users";

const SECRET = "your-secret-key";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = jwt.sign({ email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
