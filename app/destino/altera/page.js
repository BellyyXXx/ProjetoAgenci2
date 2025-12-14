import styles from './EditarDestino.module.css';
import { buscarDestinoPorId, editaDestino } from './actions';


// Função auxiliar para ícone
function getDestinoIcon(nome) {
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

async function TelaEditaDestino({ searchParams }) {
    const id = searchParams.id;
    const destino = await buscarDestinoPorId(id);

    if (!destino) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h1>Destino não encontrado</h1>
                    <p>O destino que você está tentando editar não existe.</p>
                    <a href="/destino" className={styles.backButton}>
                        Voltar para lista de destinos
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.titleContainer}>
                        <div className={styles.destinoIconPreview}>
                            {getDestinoIcon(destino.nome)}
                        </div>
                        <div>
                            <h1 className={styles.title}>
                                <span className={styles.titleIcon}>✏️</span>
                                Editar Destino
                            </h1>
                            <p className={styles.subtitle}>
                                Atualize as informações do destino <strong>{destino.nome}</strong>
                            </p>
                        </div>
                    </div>
                    <div className={styles.destinoInfo}>
                        <span className={styles.destinoId}>ID: #{destino.id}</span>
                        <span className={styles.destinoAtual}>
                            Atual: <strong>{destino.nome}</strong>
                        </span>
                    </div>
                </div>
                <a href="/destino" className={styles.backLink}>
                    ← Voltar para lista
                </a>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={editaDestino} className={styles.form}>
                    <input type="hidden" name="id" defaultValue={destino.id} />

                    <div className={styles.formGrid}>
                        {/* Coluna 1 */}
                        <div className={styles.formColumn}>
                            {/* Nome */}
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome do Destino *
                                </label>
                                <input 
                                    type="text" 
                                    id="nome"
                                    name="nome" 
                                    className={styles.input}
                                    defaultValue={destino.nome}
                                    required
                                    autoFocus
                                    placeholder="Ex: Praia do Francês"
                                />
                                <small className={styles.helperText}>
                                    Nome atrativo para o destino turístico
                                </small>
                            </div>

                            {/* Cidade */}
                            <div className={styles.formGroup}>
                                <label htmlFor="cidade" className={styles.label}>
                                    Cidade *
                                </label>
                                <input 
                                    type="text" 
                                    id="cidade"
                                    name="cidade" 
                                    className={styles.input}
                                    defaultValue={destino.cidade}
                                    required
                                    placeholder="Ex: Maceió"
                                />
                            </div>

                            {/* País */}
                            <div className={styles.formGroup}>
                                <label htmlFor="pais" className={styles.label}>
                                    País *
                                </label>
                                <input 
                                    type="text" 
                                    id="pais"
                                    name="pais" 
                                    className={styles.input}
                                    defaultValue={destino.pais}
                                    required
                                    placeholder="Ex: Brasil"
                                />
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
                            {/* Descrição */}
                            <div className={styles.formGroup}>
                                <label htmlFor="descricao" className={styles.label}>
                                    Descrição Detalhada
                                </label>
                                <textarea 
                                    id="descricao"
                                    name="descricao" 
                                    className={styles.textarea}
                                    defaultValue={destino.descricao}
                                    rows="8"
                                    placeholder="Descreva os atrativos do destino, melhores épocas para visita, atividades disponíveis..."
                                />
                                <div className={styles.textareaInfo}>
                                    <span className={styles.charCount}>
                                        {destino.descricao?.length || 0} caracteres
                                    </span>
                                    <small className={styles.helperText}>
                                        Dica: Uma boa descrição aumenta o interesse dos turistas
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ações do formulário */}
                    <div className={styles.formActions}>
                        <a href="/destino" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>💾</span>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>

            {/* Pré-visualização do destino */}
            <div className={styles.previewBox}>
                <h3 className={styles.previewTitle}>
                    <span className={styles.previewIcon}>👁️</span>
                    Pré-visualização do Destino
                </h3>
                <div className={styles.previewContent}>
                    <div className={styles.previewHeader}>
                        <span className={styles.previewIconLarge}>
                            {getDestinoIcon(destino.nome)}
                        </span>
                        <div>
                            <h4 className={styles.previewName}>{destino.nome}</h4>
                            <p className={styles.previewLocation}>
                                {destino.cidade}, {destino.pais}
                            </p>
                        </div>
                    </div>
                    <div className={styles.previewDescription}>
                        <p>{destino.descricao || "Descrição do destino aparecerá aqui..."}</p>
                    </div>
                </div>
            </div>

            {/* Informações da edição */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    Informações Importantes
                </h3>
                <ul className={styles.infoList}>
                    <li>Os campos marcados com <span className={styles.required}>*</span> são obrigatórios</li>
                    <li>Use descrições atrativas e detalhadas para engajar os turistas</li>
                    <li>Após salvar, você será redirecionado para a lista de destinos</li>
                    <li>Verifique se todas as informações estão corretas antes de salvar</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaEditaDestino;