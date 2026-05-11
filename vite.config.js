import { defineConfig, loadEnv } from "vite";
import { parseSubscribePayload, sendWelcomeEmail } from "./js/server/subscribe-mail.js";

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function subscribeRoute() {
  const handler = async (request, response, next) => {
    if (!request.url.startsWith("/api/subscribe")) {
      next();
      return;
    }

    if (request.method !== "POST") {
      response.statusCode = 405;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(JSON.stringify({ error: "Metodo no permitido." }));
      return;
    }

    try {
      const rawBody = await readRequestBody(request);
      const payload = rawBody ? JSON.parse(rawBody) : {};
      const parsed = parseSubscribePayload(payload);

      if (!parsed.ok) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify({ error: parsed.error }));
        return;
      }

      await sendWelcomeEmail(parsed);

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(
        JSON.stringify({
          message: "Suscripcion completada. Revisa tu correo para ver el mensaje de bienvenida.",
        })
      );
    } catch (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : "No se pudo enviar el correo de bienvenida.",
        })
      );
    }
  };

  return {
    name: "subscribe-route",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [
    subscribeRoute(),
    {
      name: "load-local-env",
      config(config, { mode }) {
        const env = loadEnv(mode, process.cwd(), "");

        for (const [key, value] of Object.entries(env)) {
          if (typeof process.env[key] === "undefined") {
            process.env[key] = value;
          }
        }

        return config;
      },
    },
  ],
});