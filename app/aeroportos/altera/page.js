import { redirect } from "next/navigation";
import { Aeroporto } from "../../../database/tables";
import styles from './EditarAeroporto.module.css';

async function editaAeroporto(formData) {
    'use server'

    const id = formData.get('id');
    const nome = formData.get('nome');
    const cidade = formData.get('cidade');
    const sigla = formData.get('sigla');
    const terminais = formData.get('terminais');

    const aero = await Aeroporto.findByPk(id);

    if (!aero) {
        throw new Error("Aeroporto não encontrado");
    }

    aero.nome = nome;
    aero.cidade = cidade;
    aero.sigla = sigla.toUpperCase();
    aero.terminais = terminais || null;
    
    await aero.save();
    redirect('/aeroportos');
}

async function TelaEditaAeroporto({ searchParams }) {
    const id = searchParams.id;
    const aeroporto = await Aeroporto.findByPk(id);

    if (!aeroporto) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h1>Aeroporto não encontrado</h1>
                    <p>O aeroporto que você está tentando editar não existe.</p>
                    <a href="/aeroportos" className={styles.backButton}>
                        Voltar para lista de aeroportos
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
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>✏️</span>
                        Editar Aeroporto
                    </h1>
                    <p className={styles.subtitle}>
                        Atualize as informações do aeroporto <strong>{aeroporto.nome}</strong>
                    </p>
                </div>
                <a href="/aeroportos" className={styles.backLink}>
                    ← Voltar
                </a>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={editaAeroporto} className={styles.form}>
                    <input type="hidden" name="id" defaultValue={aeroporto.id} />

                    <div className={styles.formGrid}>
                        {/* Coluna 1 */}
                        <div className={styles.formColumn}>
                            {/* Nome */}
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome do Aeroporto *
                                </label>
                                <input 
                                    type="text" 
                                    id="nome"
                                    name="nome" 
                                    className={styles.input}
                                    defaultValue={aeroporto.nome}
                                    required
                                    autoFocus
                                />
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
                                    defaultValue={aeroporto.cidade}
                                    required
                                />
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="sigla" className={styles.label}>
                                    Código IATA *
                                </label>
                                <input 
                                    type="text" 
                                    id="sigla"
                                    name="sigla" 
                                    className={styles.input}
                                    defaultValue={aeroporto.sigla}
                                    required
                                    maxLength="3"
                                    pattern="[A-Z]{3}"
                                    title="3 letras maiúsculas"
                                    style={{ textTransform: 'uppercase' }}
                                />
                                <small className={styles.helperText}>
                                    3 letras maiúsculas
                                </small>
                            </div>

                            
                            <div className={styles.formGroup}>
                                <label htmlFor="terminais" className={styles.label}>
                                    Número de Terminais
                                </label>
                                <input 
                                    type="number" 
                                    id="terminais"
                                    name="terminais" 
                                    className={styles.input}
                                    defaultValue={aeroporto.terminais || ''}
                                    min="1"
                                    max="20"
                                    placeholder="Ex: 3"
                                />
                                <small className={styles.helperText}>
                                    Opcional
                                </small>
                            </div>
                        </div>
                    </div>

                    
                    <div className={styles.formActions}>
                        <a href="/aeroportos" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>💾</span>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>

            {/* Caixa de informações */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    Informações da Edição
                </h3>
                <ul className={styles.infoList}>
                    <li>Os campos marcados com * são obrigatórios</li>
                    <li>O código IATA será convertido para maiúsculas automaticamente</li>
                    <li>Deixe o campo de terminais em branco para remover o valor</li>
                    <li>Após salvar, você será redirecionado para a lista de aeroportos</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaEditaAeroporto;