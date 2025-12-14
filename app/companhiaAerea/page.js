// app/companhiaAerea/page.js
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { CompanhiaAerea } from "../../database/tables";
import styles from './CompanhiaAerea.module.css';

async function deletarCompanhiaAerea(formData) {
    'use server';
    const id = formData.get('id');
    const companhiaAerea = await CompanhiaAerea.findByPk(id);
    await companhiaAerea.destroy();
    redirect('/companhiaAerea');
}

async function TelaCompanhiaAerea() {
    const companhiaAerea = await CompanhiaAerea.findAll();

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>✈️</span>
                        Companhias Aéreas
                    </h1>
                    <p className={styles.subtitle}>
                        Gerencie todas as companhias aéreas cadastradas no sistema
                    </p>
                </div>
                <a href="/companhiaAerea/novo" className={styles.novaCompanhiaBtn}>
                    <span className={styles.plusIcon}>+</span>
                    Nova Companhia Aérea
                </a>
            </div>

            {/* Tabela de companhias aéreas */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Código IATA</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {companhiaAerea.length === 0 ? (
                            <tr>
                                <td colSpan="4" className={styles.emptyMessage}>
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>✈️</div>
                                        <h3>Nenhuma companhia aérea cadastrada</h3>
                                        <p>Comece cadastrando sua primeira companhia aérea!</p>
                                        <a href="/companhiaAerea/novo" className={styles.emptyButton}>
                                            Cadastrar Companhia Aérea
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            companhiaAerea.map((comp) => (
                                <tr key={comp.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <span className={styles.idBadge}>#{comp.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.companhiaInfo}>
                                            <div className={styles.avatar}>
                                                {comp.nome.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className={styles.nome}>{comp.nome}</div>
                                                <div className={styles.codigoInfo}>Código: {comp.codigoIATA}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.codigoBadge}>{comp.codigoIATA}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.acoesContainer}>
                                            <a 
                                                href={`/companhiaAerea/altera?id=${comp.id}`}
                                                className={styles.editarBtn}
                                            >
                                                <span className={styles.btnIcon}>✏️</span>
                                                Editar
                                            </a>
                                            <form action={deletarCompanhiaAerea} className={styles.formInline}>
                                                <input type="hidden" name="id" defaultValue={comp.id} />
                                                <button type="submit" className={styles.excluirBtn}>
                                                    <span className={styles.btnIcon}>🗑️</span>
                                                    Excluir
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
                <div className={styles.totalRegistros}>
                    Total de {companhiaAerea.length} {companhiaAerea.length === 1 ? 'companhia aérea' : 'companhias aéreas'}
                </div>
            </div>
        </div>
    );
}

export default TelaCompanhiaAerea;