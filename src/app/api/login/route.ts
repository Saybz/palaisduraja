import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { USER_CREDENTIALS, JWT_SECRET } from "../../../config/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Vérifier le nom d'utilisateur
  if (username !== USER_CREDENTIALS.username) {
    return NextResponse.json(
      { success: false, message: "Identifiants incorrects" },
      { status: 401 }
    );
  }

  // Vérifier le mot de passe haché
  const isPasswordValid = await bcrypt.compare(
    password,
    USER_CREDENTIALS.passwordHash
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { success: false, message: "Identifiants incorrects" },
      { status: 401 }
    );
  }

  // Génération du token JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  const response = NextResponse.json({ success: true });

  // Stocker le token dans un cookie sécurisé
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 heure
  });

  return response;
}
