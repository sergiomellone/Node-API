import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;

}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {

  //receber o token
  const token = request.headers.authorization;

  //validar de o toke está preenchido
  if (!token) {
    return response.status(401).json({ message: "Token missing" });
  }
  //validar o token
  try {
    const { sub } = verify(token, "35582c3abcf53d6a55073bbb3069df56") as IPayload;

    //Recuperar informações do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid Token" });
  }




}