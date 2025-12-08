import { raw } from "mysql2";
import { redirect } from 'next/navigation';
import { Cliente } from "../../database/tables";
import styles from './Clientes.module.css';

async function deletarCliente(formData) {
    'use server';
    const id = formData.get('id');
    const cliente = await Cliente.findByPk(id);
    await cliente.destroy();
    redirect('/clientes');
}

function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function formatarCPF(cpf) {
    if (!cpf) return '';
    // Remove caracteres não numéricos e formata
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone) {
    if (!telefone) return '';
    const telLimpo = telefone.replace(/\D/g, '');
    if (telLimpo.length === 11) {
        return telLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telLimpo.length === 10) {
        return telLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $3-$4');
    }
    return telefone;
}


async function TelaClientes() {
    const clientes = await Cliente.findAll({ raw: true });

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>👥 Clientes</h1>
                    <p className={styles.subtitle}>Gerencie todos os clientes cadastrados no sistema</p>
                </div>
                <a href="/clientes/novo" className={styles.novoClienteBtn}>
                    + Novo Cliente
                </a>
            </div>

            {/* Tabela */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Nascimento</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Gênero</th>
                            <th className={styles.th}>CPF</th>
                            <th className={styles.th}>Telefone</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.length === 0 ? (
                            <tr>
                                <td colSpan="8" className={styles.emptyMessage}>
                                    Nenhum cliente cadastrado. <a href="/clientes/novo">Cadastre o primeiro cliente</a>
                                </td>
                            </tr>
                        ) : (
                            clientes.map((cli) => (
                                <tr key={cli.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <span className={styles.idBadge}>#{cli.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.nomeContainer}>
                                            <div className={styles.avatar}>
                                                {cli.nome?.charAt(0) || 'C'}
                                            </div>
                                            <div>
                                                <div className={styles.nome}>{cli.nome}</div>
                                                <div className={styles.emailSmall}>{cli.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>{formatarData(cli.nascimento)}</td>
                                    <td className={styles.td}>{cli.email}</td>
                                    <td className={styles.td}>
                                        <span className={`${styles.generoBadge} ${
                                            cli.genero === 'F' ? styles.feminino : 
                                            cli.genero === 'M' ? styles.masculino : 
                                            styles.outro
                                        }`}>
                                            {cli.genero === 'F' ? 'Feminino' : 
                                             cli.genero === 'M' ? 'Masculino' : 
                                             cli.genero || 'Não informado'}
                                        </span>
                                    </td>
                                    <td className={styles.td}>{formatarCPF(cli.cpf)}</td>
                                    <td className={styles.td}>{formatarTelefone(cli.telefone)}</td>
                                    <td className={styles.td}>
                                        <div className={styles.acoesContainer}>
                                            <form action={'/clientes/altera'} className={styles.formInline}>
                                                <input type="hidden" name="id" value={cli.id} />
                                                <button type="submit" className={styles.editarBtn}>
                                                    ✏️ Editar
                                                </button>
                                            </form>
                                            <form action={deletarCliente} className={styles.formInline}>
                                                <input type="hidden" name="id" value={cli.id} />
                                                <button type="submit" className={styles.excluirBtn}>
                                                    🗑️ Excluir
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Rodapé da tabela */}
            <div className={styles.footer}>
                <div className={styles.totalClientes}>
                    Total de {clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}
                </div>
            </div>
        </div>
    );
}

export default TelaClientes;