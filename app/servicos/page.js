// app/servicos/page.js
import { redirect } from 'next/navigation';
import { Servico } from "../../database/tables";
import styles from './Servicos.module.css';

async function deletarServicos(formData) {
    'use server';
    const id = formData.get('id');
    const servicos = await Servico.findByPk(id);
    await servicos.destroy();
    redirect('/servicos');
}

// Função auxiliar para formatar preços
function formatarPreco(valor) {
    if (valor === null || valor === undefined) return '0.00';
    const preco = parseFloat(valor);
    if (isNaN(preco)) return '0.00';
    return preco.toFixed(2);
}

async function TelaServicos() {
    const servicos = await Servico.findAll();

    // Funções auxiliares dentro do componente, mas ANTES do return
    const calcularTotalServicos = () => {
        try {
            const total = servicos.reduce((total, servico) => {
                const preco = parseFloat(servico.preco);
                return total + (isNaN(preco) ? 0 : preco);
            }, 0);
            return formatarPreco(total);
        } catch (error) {
            console.error('Erro ao calcular total:', error);
            return '0.00';
        }
    };

    const contarAventura = () => {
        return servicos.filter(s => s.categoria === 'Turismo de aventura').length;
    };

    const contarPremium = () => {
        return servicos.filter(s => {
            const preco = parseFloat(s.preco);
            return !isNaN(preco) && preco > 100;
        }).length;
    };

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>🔧</span>
                        Serviços
                    </h1>
                    <p className={styles.subtitle}>
                        Gerencie todos os serviços disponíveis no sistema
                    </p>
                </div>
                <a href="/servicos/novo" className={styles.novoServicoBtn}>
                    <span className={styles.plusIcon}>+</span>
                    Novo Serviço
                </a>
            </div>

            {/* Estatísticas rápidas - FIXED */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{servicos.length}</span>
                        <span className={styles.statLabel}>Total de Serviços</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>
                            R$ {calcularTotalServicos()}  {/* ✅ Agora funciona */}
                        </span>
                        <span className={styles.statLabel}>Valor Total</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>
                            {contarAventura()}
                        </span>
                        <span className={styles.statLabel}>Aventura</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⭐</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>
                            {contarPremium()}
                        </span>
                        <span className={styles.statLabel}>Premium</span>
                    </div>
                </div>
            </div>

            {/* Tabela de serviços */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Serviço</th>
                            <th className={styles.th}>Categoria</th>
                            <th className={styles.th}>Preço</th>
                            <th className={styles.th}>Duração</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {servicos.length === 0 ? (
                            <tr>
                                <td colSpan="7" className={styles.emptyMessage}>
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>🔧</div>
                                        <h3>Nenhum serviço cadastrado</h3>
                                        <p>Comece adicionando seu primeiro serviço ao sistema</p>
                                        <a href="/servicos/novo" className={styles.emptyButton}>
                                            Criar Primeiro Serviço
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            servicos.map((servico) => (
                                <tr key={servico.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <span className={styles.idBadge}>#{servico.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.serviceInfo}>
                                            <div className={styles.serviceIcon}>🔧</div>
                                            <div>
                                                <div className={styles.serviceName}>{servico.nome}</div>
                                                <div className={styles.serviceDescription}>
                                                    {servico.descricao?.substring(0, 50) || 'Sem descrição'}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={`${styles.categoryBadge} ${
                                            servico.categoria === 'Turismo de aventura' ? styles.categoryAdventure :
                                            servico.categoria === 'Hospedagem' ? styles.categoryLodging :
                                            servico.categoria === 'Transporte' ? styles.categoryTransport :
                                            servico.categoria === 'Alimentação' ? styles.categoryFood :
                                            servico.categoria === 'Guia turístico' ? styles.categoryGuide :
                                            styles.categoryOther
                                        }`}>
                                            {servico.categoria || 'Sem categoria'}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.priceWrapper}>
                                            <span className={styles.priceValue}>
                                                R$ {formatarPreco(servico.preco)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.durationBadge}>
                                            <span className={styles.durationIcon}>⏱️</span>
                                            {servico.duracao || 'Não definida'}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.statusBadge}>
                                            <span className={styles.statusDot}></span>
                                            Ativo
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.acoesContainer}>
                                            <a 
                                                href={`/servicos/altera?id=${servico.id}`}
                                                className={styles.editarBtn}
                                            >
                                                <span className={styles.btnIcon}>✏️</span>
                                                Editar
                                            </a>
                                            <form action={deletarServicos} className={styles.formInline}>
                                                <input type="hidden" name="id" defaultValue={servico.id} />
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
                <div className={styles.footerContent}>
                    <div className={styles.totalRegistros}>
                        Exibindo {servicos.length} {servicos.length === 1 ? 'serviço' : 'serviços'}
                    </div>
                    <div className={styles.footerActions}>
                        <button className={styles.exportBtn}>
                            📊 Exportar Lista
                        </button>
                    </div>
                </div>
            </div>

            {/* Dicas rápidas */}
            <div className={styles.quickTips}>
                <h3 className={styles.tipsTitle}>
                    <span className={styles.tipsIcon}>💡</span>
                    Dicas Rápidas
                </h3>
                <div className={styles.tipsContent}>
                    <div className={styles.tip}>
                        <span className={styles.tipNumber}>1</span>
                        Clique no nome do serviço para ver detalhes completos
                    </div>
                    <div className={styles.tip}>
                        <span className={styles.tipNumber}>2</span>
                        Use filtros para encontrar serviços específicos por categoria
                    </div>
                    <div className={styles.tip}>
                        <span className={styles.tipNumber}>3</span>
                        Os serviços ativos aparecem em verde na coluna de status
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TelaServicos;