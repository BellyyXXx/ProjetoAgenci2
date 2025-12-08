// app/clientes/novo/page.js
import { Cliente } from "../../../database/tables";
import { redirect } from "next/navigation";
import styles from './NovoCliente.module.css';

async function insertCliente(formData) {
    'use server'
    
    // Garantir que o gênero seja um dos valores permitidos pelo ENUM
    let genero = formData.get("genero");
    
    // Se não for M, F ou O, definir como O (Outro)
    if (!['M', 'F', 'O'].includes(genero)) {
        genero = 'O';
    }
    
    // Limpar formatação do CPF e telefone (apenas números)
    const cpfLimpo = formData.get("cpf").replace(/\D/g, '');
    const telefoneLimpo = formData.get("telefone").replace(/\D/g, '');
    
    const dados = {
        nome: formData.get("nome"),
        nascimento: formData.get("nascimento"),
        email: formData.get("email"),
        senha: formData.get("senha"),
        genero: genero, // Agora sempre será M, F ou O
        cpf: cpfLimpo,
        telefone: telefoneLimpo
    };
    
    await Cliente.create(dados);
    redirect("/clientes");
}

function TelaNovoCliente() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>👤 Novo Cliente</h1>
                <p className={styles.subtitle}>Preencha os dados para cadastrar um novo cliente</p>
            </div>

            <div className={styles.formContainer}>
                <form action={insertCliente} className={styles.form}>
                    <div className={styles.formGrid}>
                        {/* Coluna 1 */}
                        <div className={styles.formColumn}>
                            {/* Nome */}
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome Completo *
                                </label>
                                <input 
                                    type="text" 
                                    id="nome"
                                    name="nome" 
                                    className={styles.input}
                                    placeholder="Digite o nome completo"
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Email */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email *
                                </label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email" 
                                    className={styles.input}
                                    placeholder="exemplo@email.com"
                                    required
                                />
                            </div>

                            {/* CPF */}
                            <div className={styles.formGroup}>
                                <label htmlFor="cpf" className={styles.label}>
                                    CPF *
                                </label>
                                <input 
                                    type="text" 
                                    id="cpf"
                                    name="cpf" 
                                    className={styles.input}
                                    placeholder="000.000.000-00"
                                    required
                                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                    title="Formato: 000.000.000-00"
                                />
                                <small className={styles.helperText}>
                                    Formato: 000.000.000-00
                                </small>
                            </div>

                            {/* Gênero - CORRIGIDO para usar apenas M, F, O */}
                            <div className={styles.formGroup}>
                                <label htmlFor="genero" className={styles.label}>
                                    Gênero *
                                </label>
                                <select 
                                    id="genero"
                                    name="genero" 
                                    className={styles.select}
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled>Selecione o gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
                            {/* Data de Nascimento */}
                            <div className={styles.formGroup}>
                                <label htmlFor="nascimento" className={styles.label}>
                                    Data de Nascimento *
                                </label>
                                <input 
                                    type="date" 
                                    id="nascimento"
                                    name="nascimento" 
                                    className={styles.input}
                                    required
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Senha */}
                            <div className={styles.formGroup}>
                                <label htmlFor="senha" className={styles.label}>
                                    Senha *
                                </label>
                                <div className={styles.passwordWrapper}>
                                    <input 
                                        type="password" 
                                        id="senha"
                                        name="senha" 
                                        className={styles.input}
                                        placeholder="Digite uma senha segura"
                                        required
                                        minLength="6"
                                    />
                                </div>
                                <small className={styles.helperText}>
                                    Mínimo 6 caracteres
                                </small>
                            </div>

                            {/* Telefone */}
                            <div className={styles.formGroup}>
                                <label htmlFor="telefone" className={styles.label}>
                                    Telefone *
                                </label>
                                <input 
                                    type="tel" 
                                    id="telefone"
                                    name="telefone" 
                                    className={styles.input}
                                    placeholder="(00) 00000-0000"
                                    required
                                    pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
                                    title="Formato: (00) 00000-0000"
                                />
                                <small className={styles.helperText}>
                                    Formato: (00) 00000-0000
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <a href="/clientes" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>✓</span>
                            Cadastrar Cliente
                        </button>
                    </div>
                </form>
            </div>

            {/* Informações úteis */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>📋 Informações importantes</h3>
                <ul className={styles.infoList}>
                    <li>Todos os campos marcados com * são obrigatórios</li>
                    <li>Certifique-se de que o email informado é válido</li>
                    <li>O CPF deve ser único para cada cliente</li>
                    <li>A senha será criptografada automaticamente</li>
                    <li>Os dados serão armazenados de forma segura</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaNovoCliente;