import * as ftp from "basic-ftp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../out");

const FTP_HOST = process.env.FTP_HOST || "ftp.barcelonafilmes.com.br";
const FTP_USER = process.env.FTP_USER || "dev@barcelonafilmes.com.br";
const FTP_PASSWORD = process.env.FTP_PASSWORD || "@13setDev";

const TARGET_DIRECTORIES = ["laraveloso.com", "laraveloso.com.br"];

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`\n📡 Conectando ao servidor FTP (${FTP_HOST})...`);
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      secure: false,
    });

    console.log("✅ Conectado com sucesso!");
    console.log("📂 Diretório raiz do FTP:", await client.pwd());

    for (const targetDir of TARGET_DIRECTORIES) {
      console.log(`\n🚀 Iniciando upload para: ${targetDir}...`);
      await client.cd("/");
      await client.ensureDir(targetDir);
      await client.uploadFromDir(outDir);
      console.log(`✅ Upload concluído com sucesso para ${targetDir}!`);
    }

    console.log("\n🎉 Deploy finalizado com sucesso em todos os domínios!");
  } catch (err) {
    console.error("\n❌ Erro durante o deploy:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
