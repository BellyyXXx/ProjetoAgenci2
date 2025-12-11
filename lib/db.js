import postgres from 'postgres';

const sql = postgres({
  host: process.env.dpg-d4saamvgi27c73c5feig-a,      // Host do Render
  database: process.env.agenciaviagenscms,  // Nome do banco
  username: process.env.agenciaviagenscms_user,  // Usuário
  password: process.env.mOOj3lpHVFy511tlVmQvAQgWQ25AdmGY, // Senha
  port: 5432,
  ssl: 'require'
});

export default sql;