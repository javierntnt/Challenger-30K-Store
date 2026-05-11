import { parseSubscribePayload, sendWelcomeEmail } from "../js/server/subscribe-mail.js";

function sendJson(response, status, body) {
  response.status(status).json(body);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Metodo no permitido." });
    return;
  }

  let payload;

  try {
    payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    sendJson(response, 400, { error: "El cuerpo de la solicitud no es valido." });
    return;
  }

  const parsed = parseSubscribePayload(payload);

  if (!parsed.ok) {
    sendJson(response, 400, { error: parsed.error });
    return;
  }

  try {
    await sendWelcomeEmail(parsed);
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "No se pudo enviar el correo de bienvenida.",
    });
    return;
  }

  sendJson(response, 200, {
    message: "Suscripcion completada. Revisa tu correo para ver el mensaje de bienvenida.",
  });
}