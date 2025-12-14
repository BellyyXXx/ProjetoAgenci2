// app/aeroportos/page.js
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { Aeroporto } from "../../database/tables";
import styles from './Aeroportos.module.css';

async function deletarAeroporto(formData) {
    'use server';
    const id = formData.get('id');
    const aeroporto = await Aeroporto.findByPk(id);
    await aeroporto.destroy();
    redirect('/aeroportos');
}

async function TelaAeroportos() {
    const aeroportos = await Aeroporto.findAll();

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>✈️</span>
                        Aeroportos
                    </h1>
                    <p className={styles.subtitle}>
                        Gerencie todos os aeroportos cadastrados no sistema
                    </p>
                </div>
                <a href="/aeroportos/novo" className={styles.novoAeroportoBtn}>
                    + Novo Aeroporto
                </a>
            </div>

            {/* Tabela de aeroportos */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Cidade</th>
                            <th className={styles.th}>Sigla</th>
                            <th className={styles.th}>Terminais</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {aeroportos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.emptyMessage}>
                                    Nenhum aeroporto cadastrado. <a href="/aeroportos/novo">Cadastre o primeiro aeroporto</a>
                                </td>
                            </tr>
                        ) : (
                            aeroportos.map((aero) => (
                                <tr key={aero.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <span className={styles.idBadge}>#{aero.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.aeroportoInfo}>
                                            <div className={styles.aeroportoIcon}>✈️</div>
                                            <div>
                                                <div className={styles.nome}>{aero.nome}</div>
                                                <div className={styles.codigo}>Código: {aero.sigla}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.cidade}>
                                            <span className={styles.cidadeIcon}>📍</span>
                                            {aero.cidade}
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.siglaBadge}>{aero.sigla}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.terminaisBadge}>
                                            {aero.terminais || 'N/A'} {aero.terminais ? 'terminais' : ''}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.acoesContainer}>
                                            <form action={'/aeroportos/altera'} className={styles.formInline}>
                                                <input type="hidden" name="id" value={aero.id} />
                                                <button type="submit" className={styles.editarBtn}>
                                                    ✏️ Editar
                                                </button>
                                            </form>
                                            <form action={deletarAeroporto} className={styles.formInline}>
                                                <input type="hidden" name="id" value={aero.id} />
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
                <div className={styles.totalAeroportos}>
                    Total de {aeroportos.length} {aeroportos.length === 1 ? 'aeroporto' : 'aeroportos'}
                </div>
            </div>
        </div>
    );
}

export default TelaAeroportos;
