// app/cliente/altera/page.js
import { redirect } from "next/navigation";
import { Cliente } from "../../../database/tables";
import styles from './EditarCliente.module.css';

async function editaCliente(formData) {
    'use server'

    const id = formData.get('id');
    const nome = formData.get('nome');
    const nascimento = formData.get('nascimento');
    const email = formData.get('email');
    const senha = formData.get('senha');
    const genero = formData.get('genero');  
    const cpf = formData.get('cpf'); 
    const telefone = formData.get('telefone'); 

    // Validar e limpar dados
    const generoValido = ['M', 'F', 'O'].includes(genero) ? genero : 'O';
    const cpfLimpo = cpf.replace(/\D/g, '');
    const telefoneLimpo = telefone.replace(/\D/g, '');

    const cli = await Cliente.findByPk(id);

    if (!cli) {
        throw new Error("Cliente não encontrado");
    }

    cli.nome = nome;
    cli.nascimento = nascimento;
    cli.email = email;
    // Apenas atualiza a senha se for fornecida
    if (senha && senha.trim() !== '') {
        cli.senha = senha;
    }
    cli.genero = generoValido;
    cli.cpf = cpfLimpo;
    cli.telefone = telefoneLimpo;
    
    await cli.save();
    redirect('/clientes');
}

async function TelaEditaCliente({ searchParams }) {
    const id = searchParams.id;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h1>Cliente não encontrado</h1>
                    <p>O cliente que você está tentando editar não existe.</p>
                    <a href="/clientes" className={styles.backButton}>
                        Voltar para lista de clientes
                    </a>
                </div>
            </div>
        );
    }

    // Formatar valores para exibição
    const formatarDataParaInput = (dataString) => {
        if (!dataString) return '';
        const data = new Date(dataString);
        return data.toISOString().split('T')[0];
    };

    const formatarCPF = (cpf) => {
        if (!cpf) return '';
        const cpfLimpo = cpf.replace(/\D/g, '');
        return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarTelefone = (telefone) => {
        if (!telefone) return '';
        const telLimpo = telefone.replace(/\D/g, '');
        if (telLimpo.length === 11) {
            return telLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telLimpo.length === 10) {
            return telLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    };

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>✏️</span>
                        Editar Cliente
                    </h1>
                    <p className={styles.subtitle}>
                        Atualize as informações do cliente <strong>{cliente.nome}</strong>
                    </p>
                </div>
                <a href="/clientes" className={styles.backLink}>
                    ← Voltar
                </a>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={editaCliente} className={styles.form}>
                    <input type="hidden" name="id" defaultValue={cliente.id} />

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
                                    defaultValue={cliente.nome}
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
                                    defaultValue={cliente.email}
                                    required
                                />
                            </div>

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
                                    defaultValue={formatarDataParaInput(cliente.nascimento)}
                                    required
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
                            {/* Gênero */}
                            <div className={styles.formGroup}>
                                <label htmlFor="genero" className={styles.label}>
                                    Gênero *
                                </label>
                                <select 
                                    id="genero"
                                    name="genero" 
                                    className={styles.select}
                                    defaultValue={cliente.genero || 'O'}
                                    required
                                >
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
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
                                    defaultValue={formatarCPF(cliente.cpf)}
                                    required
                                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                    title="Formato: 000.000.000-00"
                                />
                                <small className={styles.helperText}>
                                    Formato: 000.000.000-00
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
                                    defaultValue={formatarTelefone(cliente.telefone)}
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

                    {/* Senha (opcional) */}
                    <div className={styles.passwordSection}>
                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.labelOptional}>
                                Senha
                                <span className={styles.optionalText}> (opcional)</span>
                            </label>
                            <input 
                                type="password" 
                                id="senha"
                                name="senha" 
                                className={styles.input}
                                placeholder="Deixe em branco para manter a senha atual"
                                autoComplete="new-password"
                            />
                            <small className={styles.helperText}>
                                Deixe em branco para manter a senha atual
                            </small>
                        </div>
                    </div>

                    {/* Ações do formulário */}
                    <div className={styles.formActions}>
                        <a href="/clientes" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>💾</span>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>

            {/* Informações úteis */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    Informações da Edição
                </h3>
                <ul className={styles.infoList}>
                    <li>Os campos marcados com * são obrigatórios</li>
                    <li>Apenas altere a senha se desejar modificar a atual</li>
                    <li>O CPF deve estar no formato correto com pontos e traço</li>
                    <li>O telefone deve incluir DDD e estar formatado corretamente</li>
                    <li>Após salvar, você será redirecionado para a lista de clientes</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaEditaCliente;