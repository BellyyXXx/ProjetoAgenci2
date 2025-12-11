// app/companhiaAerea/altera/page.js
import { redirect } from "next/navigation";
import { CompanhiaAerea } from "../../../database/tables";
import styles from './EditarCompanhiaAerea.module.css';

async function editaCompanhiaAereao(formData) {
    'use server'
    const id = formData.get('id');
    const nome = formData.get('nome');
    const codigoIATA = formData.get('codigoIATA');

    const comp = await CompanhiaAerea.findByPk(id);

    if (!comp) {
        throw new Error("Companhia Aérea não encontrada");
    }

    comp.nome = nome;
    comp.codigoIATA = codigoIATA.toUpperCase();
    
    await comp.save();
    redirect('/companhiaAerea');
}

async function TelaEditaCompanhiaAerea({ searchParams }) {
    const id = searchParams.id;
    const companhiaAerea = await CompanhiaAerea.findByPk(id);

    // Se não encontrar a companhia aérea
    if (!companhiaAerea) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h1 className={styles.errorTitle}>
                        <span className={styles.errorIcon}>⚠️</span>
                        Companhia Aérea Não Encontrada
                    </h1>
                    <p className={styles.errorMessage}>
                        A companhia aérea que você está tentando editar não existe ou foi removida.
                    </p>
                    <a href="/companhiaAerea" className={styles.backButton}>
                        ← Voltar para a Lista
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
                        Editar Companhia Aérea
                    </h1>
                    <p className={styles.subtitle}>
                        Atualize as informações da companhia aérea
                    </p>
                </div>
                <div className={styles.companyInfo}>
                    <span className={styles.companyBadge}>{companhiaAerea.codigoIATA}</span>
                    <span className={styles.companyName}>{companhiaAerea.nome}</span>
                </div>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={editaCompanhiaAereao} className={styles.form}>
                    <input type="hidden" name="id" defaultValue={companhiaAerea.id} />
                    
                    <div className={styles.formGrid}>
                        {/* Nome */}
                        <div className={styles.formGroup}>
                            <label htmlFor="nome" className={styles.label}>
                                Nome da Companhia Aérea *
                            </label>
                            <input 
                                type="text" 
                                id="nome"
                                name="nome" 
                                className={styles.input}
                                defaultValue={companhiaAerea.nome}
                                required
                                autoFocus
                                autoComplete="off"
                                placeholder="Digite o nome completo da companhia"
                            />
                            <small className={styles.helperText}>
                                Nome oficial da companhia aérea
                            </small>
                        </div>

                        {/* Código IATA */}
                        <div className={styles.formGroup}>
                            <label htmlFor="codigoIATA" className={styles.label}>
                                Código IATA *
                            </label>
                            <input 
                                type="text" 
                                id="codigoIATA"
                                name="codigoIATA" 
                                className={styles.input}
                                defaultValue={companhiaAerea.codigoIATA}
                                required
                                maxLength="2"
                                pattern="[A-Za-z]{2}"
                                title="Código IATA com 2 letras"
                                style={{ textTransform: 'uppercase' }}
                                autoComplete="off"
                                placeholder="Ex: LA"
                            />
                            <small className={styles.helperText}>
                                2 letras que identificam a companhia
                            </small>
                        </div>
                    </div>

                    {/* Status e Informações Adicionais */}
                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>ℹ️</div>
                            <div className={styles.infoContent}>
                                <h3 className={styles.infoTitle}>Informações da Companhia</h3>
                                <ul className={styles.infoList}>
                                    <li><strong>ID:</strong> #{companhiaAerea.id}</li>
                                    <li><strong>Código Atual:</strong> {companhiaAerea.codigoIATA}</li>
                                    <li><strong>Status:</strong> <span className={styles.statusActive}>Ativa</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Ações do Formulário */}
                    <div className={styles.formActions}>
                        <a href="/companhiaAerea" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <div className={styles.actionButtons}>
                            <a 
                                href="/companhiaAerea" 
                                className={styles.backButtonSmall}
                            >
                                ← Voltar
                            </a>
                            <button type="submit" className={styles.submitButton}>
                                <span className={styles.buttonIcon}>💾</span>
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TelaEditaCompanhiaAerea;