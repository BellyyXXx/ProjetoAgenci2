// app/destino/novo/page.js
import { Destino } from "../../../database/tables";
import { redirect } from "next/navigation";
import styles from './NovoDestino.module.css';

async function insertDestino(formData) {
    'use server';

    const dados = {
        nome: formData.get('nome'),
        descricao: formData.get('descricao'),
        cidade: formData.get('cidade'),
        pais: formData.get('pais')
    };

    await Destino.create(dados);
    redirect('/destino');
}

// Função auxiliar para ícone (opcional, mas mantém consistência)
function getDestinoIcon(nome) {
    if (!nome) return '📍';
    const nomeLower = nome.toLowerCase();
    if (nomeLower.includes('praia')) return '🏖️';
    if (nomeLower.includes('montanha')) return '⛰️';
    if (nomeLower.includes('cidade')) return '🏙️';
    if (nomeLower.includes('ilha')) return '🏝️';
    if (nomeLower.includes('deserto')) return '🏜️';
    if (nomeLower.includes('floresta')) return '🌲';
    return '📍';
}

function TelaNovoDestino() {
    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.titleIcon}>📍</span>
                    Novo Destino
                </h1>
                <p className={styles.subtitle}>
                    Preencha os dados para cadastrar um novo destino turístico
                </p>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={insertDestino} className={styles.form}>
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
                                    placeholder="Ex: Praia do Francês"
                                    required
                                    autoFocus
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
                                    placeholder="Ex: Maceió"
                                    required
                                />
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
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
                                    placeholder="Ex: Brasil"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descrição (ocupa largura total) */}
                    <div className={styles.fullWidthSection}>
                        <div className={styles.formGroup}>
                            <label htmlFor="descricao" className={styles.label}>
                                Descrição Detalhada *
                            </label>
                            <textarea 
                                id="descricao"
                                name="descricao" 
                                className={styles.textarea}
                                placeholder="Descreva os atrativos do destino, melhores épocas para visita, atividades disponíveis, cultura local..."
                                rows="6"
                                required
                            />
                            <div className={styles.textareaInfo}>
                                <small className={styles.helperText}>
                                    Uma boa descrição aumenta o interesse dos turistas
                                </small>
                                <span className={styles.charCountHint}>
                                    Recomendado: 200-500 caracteres
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ações do formulário */}
                    <div className={styles.formActions}>
                        <a href="/destino" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>✓</span>
                            Cadastrar Destino
                        </button>
                    </div>
                </form>
            </div>

            {/* Dica de pré-visualização */}
            <div className={styles.previewHint}>
                <div className={styles.previewHeader}>
                    <span className={styles.previewIcon}>👁️</span>
                    <div>
                        <h3 className={styles.previewTitle}>Como será exibido</h3>
                        <p className={styles.previewSubtitle}>
                            Após o cadastro, o destino aparecerá assim para os clientes
                        </p>
                    </div>
                </div>
                <div className={styles.previewExample}>
                    <div className={styles.previewCard}>
                        <div className={styles.previewCardIcon}>📍</div>
                        <div className={styles.previewCardContent}>
                            <h4>[Nome do Destino]</h4>
                            <p className={styles.previewCardLocation}>[Cidade], [País]</p>
                            <p className={styles.previewCardDescription}>
                                Sua descrição aparecerá aqui para atrair os turistas...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informações úteis */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                    <span className={styles.infoIcon}>📋</span>
                    Informações importantes
                </h3>
                <ul className={styles.infoList}>
                    <li>Todos os campos marcados com * são obrigatórios</li>
                    <li>Use nomes atrativos e descritivos para os destinos</li>
                    <li>Inclua detalhes sobre atrações, clima e cultura local</li>
                    <li>O destino será imediatamente visível para os clientes</li>
                    <li>Você pode editar as informações a qualquer momento</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaNovoDestino;