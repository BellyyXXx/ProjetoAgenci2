// app/destino/page.js - Versão atualizada com classes CSS
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { Destino } from "../../database/tables";
import styles from './Destinos.module.css';

async function deletarDestino(formData) {
    'use server';
    const id = formData.get('id');
    const destino = await Destino.findByPk(id);
    await destino.destroy();
    redirect('/destino');
}

function formatarNomeDestino(nome) {
    if (!nome) return '';
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

async function Destinos() {
    const destinos = await Destino.findAll();

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}></span>
                        Destinos
                    </h1>
                    <p className={styles.subtitle}>
                        Gerencie todos os destinos turísticos cadastrados no sistema
                    </p>
                </div>
                <a href="/destino/novo" className={styles.novoBtn}>
                    <span className={styles.plusIcon}>+</span>
                    Novo Destino
                </a>
            </div>

            {/* Tabela */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Descrição</th>
                            <th className={styles.th}>Cidade</th>
                            <th className={styles.th}>País</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {destinos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.emptyMessage}>
                                    <div className={styles.emptyContainer}>
                                        <span className={styles.emptyIcon}>🌍</span>
                                        <p>Nenhum destino cadastrado.</p>
                                        <a href="/destino/novo" className={styles.emptyLink}>
                                            Cadastre o primeiro destino
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            destinos.map((destino) => (
                                <tr key={destino.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <span className={styles.idBadge}>#{destino.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.nomeContainer}>
                                            <div className={styles.destinoIcon}>
                                                {getIconByDestino(destino.nome)}
                                            </div>
                                            <div>
                                                <div className={styles.nomeDestino}>
                                                    {formatarNomeDestino(destino.nome)}
                                                </div>
                                                <div className={styles.categoria}>
                                                    {getCategoriaDestino(destino)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.descricaoContainer}>
                                            <span className={styles.descricaoIcon}></span>
                                            <span className={styles.descricaoTexto}>
                                                {destino.descricao || 'Sem descrição'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.cidadeContainer}>
                                            <span className={styles.cidadeIcon}></span>
                                            <span>{destino.cidade}</span>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.paisContainer}>
                                            <span className={styles.paisIcon}>🇧🇷</span>
                                            <span className={styles.paisNome}>{destino.pais}</span>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.acoesContainer}>
                                            <form action={'/destino/altera'} className={styles.formInline}>
                                                <input type="hidden" name="id" value={destino.id} />
                                                <button type="submit" className={styles.editarBtn}>
                                                    <span className={styles.btnIcon}>✏️</span>
                                                    Editar
                                                </button>
                                            </form>
                                            <form action={deletarDestino} className={styles.formInline}>
                                                <input type="hidden" name="id" value={destino.id} />
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
                    <span className={styles.totalIcon}>📊</span>
                    Total de {destinos.length} {destinos.length === 1 ? 'destino' : 'destinos'}
                </div>
                <div className={styles.estatisticas}>
                    <span className={styles.estatisticaItem}>
                        <span className={styles.estatisticaIcon}>🌆</span>
                        {getCidadesUnicas(destinos)} cidades
                    </span>
                    <span className={styles.estatisticaItem}>
                        <span className={styles.estatisticaIcon}>🌎</span>
                        {getPaisesUnicos(destinos)} países
                    </span>
                </div>
            </div>
        </div>
    );
}

// Funções auxiliares
function getIconByDestino(nome) {
    if (!nome) return '📍';
    const nomeLower = nome.toLowerCase();
    
    if (nomeLower.includes('praia') || nomeLower.includes('beach')) return '🏖️';
    if (nomeLower.includes('montanha') || nomeLower.includes('mountain')) return '⛰️';
    if (nomeLower.includes('cidade') || nomeLower.includes('city')) return '🏙️';
    if (nomeLower.includes('ilha') || nomeLower.includes('island')) return '🏝️';
    if (nomeLower.includes('deserto') || nomeLower.includes('desert')) return '🏜️';
    if (nomeLower.includes('floresta') || nomeLower.includes('forest')) return '🌲';
    if (nomeLower.includes('histórico') || nomeLower.includes('historical')) return '🏛️';
    return '📍';
}

function getCategoriaDestino(destino) {
    if (!destino.descricao) return 'Destino turístico';
    
    const descLower = destino.descricao.toLowerCase();
    if (descLower.includes('praia') || descLower.includes('mar')) return 'Praia';
    if (descLower.includes('montanha') || descLower.includes('trilha')) return 'Aventura';
    if (descLower.includes('cultural') || descLower.includes('museu')) return 'Cultural';
    if (descLower.includes('gastronômico') || descLower.includes('culinário')) return 'Gastronomia';
    return 'Turismo';
}

function getCidadesUnicas(destinos) {
    const cidades = destinos.map(d => d.cidade).filter(Boolean);
    return new Set(cidades).size;
}

function getPaisesUnicos(destinos) {
    const paises = destinos.map(d => d.pais).filter(Boolean);
    return new Set(paises).size;
}

export default Destinos;