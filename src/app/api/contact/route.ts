import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return Response.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const currentDate = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const { error } = await resend.emails.send({
      from: "Portfólio Lara Veloso <contato@laraveloso.com>",
      to: "lararosaveloso@gmail.com",
      replyTo: email,
      subject: `✨ Nova mensagem de ${name} — Portfólio`,
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header com gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #994058 0%, #7d3348 50%, #442F2A 100%); border-radius: 20px 20px 0 0; padding: 48px 40px; text-align: center;">
              <!-- Film reel decorativo -->
              <div style="margin-bottom: 16px;">
                <span style="font-size: 36px;">🎬</span>
              </div>
              <h1 style="margin: 0; color: #FFF7EC; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Nova Mensagem
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 247, 236, 0.7); font-size: 14px; letter-spacing: 0.5px;">
                Recebida pelo seu portfólio
              </p>
              <!-- Linha decorativa -->
              <div style="width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #F5CBD7, transparent); margin: 20px auto 0;"></div>
            </td>
          </tr>

          <!-- Corpo do email -->
          <tr>
            <td style="background-color: #111118; padding: 0;">

              <!-- Info do remetente -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 32px 40px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(153, 64, 88, 0.12), rgba(68, 47, 42, 0.08)); border: 1px solid rgba(153, 64, 88, 0.2); border-radius: 14px;">
                      <tr>
                        <td style="padding: 24px;">
                          <!-- Avatar -->
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align: middle; padding-right: 16px;">
                                <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #994058, #F5CBD7); display: flex; align-items: center; justify-content: center; text-align: center; line-height: 48px; font-size: 20px; font-weight: 700; color: #FFF7EC;">
                                  ${name.charAt(0).toUpperCase()}
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #FFF7EC; font-size: 18px; font-weight: 600;">
                                  ${name}
                                </p>
                                <a href="mailto:${email}" style="color: #F5CBD7; font-size: 13px; text-decoration: none;">
                                  ${email}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Mensagem -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <p style="margin: 0 0 12px; color: rgba(255, 247, 236, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                      Mensagem
                    </p>
                    <div style="background-color: rgba(255, 247, 236, 0.04); border-left: 3px solid #994058; border-radius: 0 12px 12px 0; padding: 24px;">
                      <p style="margin: 0; color: rgba(255, 247, 236, 0.9); font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${message}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Botão de resposta -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 40px 36px;">
                    <a href="mailto:${email}?subject=Re: Contato pelo Portfólio" 
                       style="display: inline-block; background: linear-gradient(135deg, #994058, #7d3348); color: #FFF7EC; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 36px; border-radius: 50px; letter-spacing: 0.3px;">
                      ↩ Responder ${name.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d0d14; border-radius: 0 0 20px 20px; padding: 28px 40px; text-align: center; border-top: 1px solid rgba(153, 64, 88, 0.15);">
              <p style="margin: 0 0 4px; color: rgba(255, 247, 236, 0.3); font-size: 12px;">
                📅 ${currentDate}
              </p>
              <p style="margin: 0; color: rgba(255, 247, 236, 0.2); font-size: 11px;">
                Enviado através do formulário de contato — laraveloso.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Erro ao enviar email. Tente novamente." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
