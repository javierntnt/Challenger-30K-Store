import nodemailer from "nodemailer";

export function parseSubscribePayload(payload) {
  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();

  if (!name || !email) {
    return { ok: false, error: "Nombre y correo son obligatorios." };
  }

  return { ok: true, name, email };
}

function getTransporter(env = process.env) {
  const host = env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(env.SMTP_PORT || 465);
  const secure = String(env.SMTP_SECURE || "true") !== "false";
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Faltan credenciales SMTP en el entorno.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendWelcomeEmail({ name, email }, env = process.env) {
  const transporter = getTransporter(env);
  const from = env.WELCOME_FROM || env.SMTP_USER;
  const subject = env.WELCOME_SUBJECT || "Bienvenido a Challenger 30K Store";

  await transporter.sendMail({
    from,
    to: email,
    subject,
    text: `Hola ${name},\n\nGracias por suscribirte a Challenger 30K Store. Te damos la bienvenida a nuestra lista de novedades.\n\nMuy pronto recibirás información de productos, lanzamientos y promociones.\n\nSaludos,\nChallenger 30K Store`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #13161c;">
        <h1 style="margin: 0 0 16px;">Bienvenido, ${name}</h1>
        <p style="margin: 0 0 12px;">Gracias por suscribirte a Challenger 30K Store. Ya eres parte de nuestra lista de novedades.</p>
        <p style="margin: 0 0 12px;">Pronto recibirás noticias sobre productos, lanzamientos y promociones.</p>
        <p style="margin: 0;">Saludos,<br />Challenger 30K Store</p>
      </div>
    `,
  });
}