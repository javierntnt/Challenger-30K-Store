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
    text: `Hola ${name},\n\nGracias por suscribirte con el correo ${email}. Te damos la bienvenida a la comunidad de Challenger 30K Store.\n\nMuy pronto recibirás información sobre nuestros productos premium, nuevos sabores y promociones especiales.\n\nSaludos,\nChallenger 30K Store`,
    html: `
      <div style="background-color: #f4f0e8; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(31, 35, 43, 0.08);">
          <div style="background: linear-gradient(135deg, #4f6a32, #7a9b59); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 0.05em; text-transform: uppercase;">Challenger 30K</h1>
          </div>
          <div style="padding: 40px 30px; color: #13161c;">
            <h2 style="margin-top: 0; color: #13161c; font-size: 22px;">Hola, ${name} 👋</h2>
            <p style="font-size: 16px; line-height: 1.7; color: #5e6472; margin-bottom: 20px;">
              Gracias por registrarte con el correo <strong>${email}</strong>. Te damos la bienvenida oficial a la comunidad de <strong>Challenger 30K Store</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.7; color: #5e6472; margin-bottom: 30px;">
              Ya eres parte de nuestra lista exclusiva. A partir de ahora serás de los primeros en conocer nuestros nuevos productos, lanzamientos de sabores de temporada y promociones especiales diseñadas para ti.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://challenger-30k-store.vercel.app/" style="background: linear-gradient(135deg, #4f6a32, #7a9b59); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 999px; font-weight: bold; font-size: 16px; display: inline-block;">Explorar el catálogo</a>
            </div>
            <hr style="border: none; border-top: 1px solid rgba(19, 22, 28, 0.1); margin: 30px 0;" />
            <p style="font-size: 13px; text-align: center; color: #8e94a2; margin: 0; line-height: 1.5;">
              Estás recibiendo este correo porque te suscribiste en nuestra tienda en línea.<br />
              Venta exclusiva para mayores de edad.<br /><br />
              © ${new Date().getFullYear()} Challenger 30K Store
            </p>
          </div>
        </div>
      </div>
    `,
  });
}