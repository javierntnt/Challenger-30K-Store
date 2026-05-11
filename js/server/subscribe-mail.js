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
      <div style="background-color: #f4f0e8; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 40px rgba(31, 35, 43, 0.15);">
          
          <!-- Imagen de Cabecera (Banner) -->
          <div style="width: 100%; height: 210px; background-color: #13161c; background-image: url('https://images.unsplash.com/photo-1618367588411-d9a90fefa881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'); background-size: cover; background-position: center; position: relative;">
            <div style="background: rgba(19, 22, 28, 0.7); width: 100%; height: 100%; display: table;">
              <div style="display: table-cell; vertical-align: middle; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 38px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 800; text-shadow: 0 4px 12px rgba(0,0,0,0.6);">CHALLENGER <span style="color: #7a9b59;">30K</span></h1>
                <p style="color: #e0e0e0; font-size: 16px; margin: 10px 0 0; font-weight: 500; letter-spacing: 2px;">PREMIUM VAPING</p>
              </div>
            </div>
          </div>

          <div style="padding: 40px 30px; color: #13161c;">
            <h2 style="margin-top: 0; color: #13161c; font-size: 26px; font-weight: 700;">¡Hola, ${name}! 🎉</h2>
            
            <p style="font-size: 17px; line-height: 1.8; color: #4a4f5a; margin-bottom: 25px;">
              Gracias por unirte a la exclusividad de <strong>Challenger 30K Store</strong>. Nos alegra tener tu correo (<em>${email}</em>) en nuestra lista VIP.
            </p>

            <div style="background-color: #f8f9fa; border-left: 4px solid #7a9b59; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 35px;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #13161c;">
                <strong>⚡ Beneficios VIP:</strong><br/>
                Serás el primero en enterarte de nuestros nuevos <strong>sabores de temporada</strong>, recibirás <strong>promociones flash</strong> y acceso prioritario a nuestro stock limitado.
              </p>
            </div>

            <!-- Grilla visual con fotos -->
            <h3 style="font-size: 20px; color: #13161c; margin-bottom: 20px; text-align: center;">🔥 Nuestros sabores más vendidos 🔥</h3>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 35px;">
              <tr>
                <td width="48%" style="text-align: center; vertical-align: top;">
                  <img src="https://raw.githubusercontent.com/javierntnt/Challenger-30K-Store/main/img/WhatsApp%20Image%202026-05-11%20at%2012.18.40%20PM.jpeg" alt="Sour Apple" style="width: 100%; max-width: 200px; height: auto; border-radius: 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); margin-bottom: 12px;" />
                  <strong style="color: #13161c; font-size: 16px; display: block;">Sour Apple</strong>
                  <span style="color: #7a9b59; font-size: 14px; font-weight: bold;">30,000 Puffs</span>
                </td>
                <td width="4%"></td>
                <td width="48%" style="text-align: center; vertical-align: top;">
                  <img src="https://raw.githubusercontent.com/javierntnt/Challenger-30K-Store/main/img/WhatsApp%20Image%202026-05-11%20at%2012.18.41%20PM%20(1).jpeg" alt="Cherry Cola" style="width: 100%; max-width: 200px; height: auto; border-radius: 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); margin-bottom: 12px;" />
                  <strong style="color: #13161c; font-size: 16px; display: block;">Cherry Cola</strong>
                  <span style="color: #7a9b59; font-size: 14px; font-weight: bold;">30,000 Puffs</span>
                </td>
              </tr>
            </table>

            <div style="text-align: center; margin: 45px 0 20px;">
              <a href="https://challenger-30k-store.vercel.app/" style="background: linear-gradient(135deg, #4f6a32, #7a9b59); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 999px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 10px 25px rgba(122, 155, 89, 0.4); text-transform: uppercase; letter-spacing: 0.05em;">Ir a la Tienda</a>
            </div>
            
          </div>

          <!-- Footer -->
          <div style="background-color: #13161c; padding: 35px 30px; text-align: center;">
            <p style="font-size: 18px; color: #ffffff; margin: 0 0 15px 0; font-weight: bold; letter-spacing: 1px;">
              CHALLENGER 30K
            </p>
            <p style="font-size: 12px; color: #5e6472; margin: 0; line-height: 1.6;">
              Estás recibiendo este correo porque te suscribiste en nuestra tienda en línea.<br />
              Venta exclusiva para mayores de edad. El producto contiene nicotina, una sustancia altamente adictiva.<br /><br />
              © ${new Date().getFullYear()} Challenger 30K Store. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}