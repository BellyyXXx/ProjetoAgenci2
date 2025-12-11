// app/companhiaAerea/novo/page.js
import { redirect } from 'next/navigation';
import { CompanhiaAerea } from "../../../database/tables";
import styles from './NovaCompanhiaAerea.module.css';

async function insertCompanhiaAerea(formData) {
    'use server';

    const dados = {
        nome: formData.get('nome'),
        codigoIATA: formData.get('codigoIATA').toUpperCase() // Convertendo para maiúsculas
    }

    await CompanhiaAerea.create(dados);
    redirect('/companhiaAerea');
}

function TelaNovaCompanhiaAerea() {
    return (
        <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.titleIcon}>✈️</span>
                    Nova Companhia Aérea
                </h1>
                <p className={styles.subtitle}>
                    Cadastre uma nova companhia aérea no sistema
                </p>
            </div>

            {/* Formulário */}
            <div className={styles.formContainer}>
                <form action={insertCompanhiaAerea} className={styles.form}>
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
                            placeholder="Ex: LATAM Airlines Brasil"
                            required
                            autoFocus
                            autoComplete="off"
                        />
                        <small className={styles.helperText}>
                            Digite o nome completo da companhia aérea
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
                            placeholder="Ex: LA"
                            required
                            maxLength="2"
                            pattern="[A-Za-z]{2}"
                            title="Código IATA com 2 letras"
                            style={{ textTransform: 'uppercase' }}
                            autoComplete="off"
                        />
                        <small className={styles.helperText}>
                            Digite 2 letras (ex: LA, G3, JJ, AD)
                        </small>
                    </div>

                    {/* Ações do formulário */}
                    <div className={styles.formActions}>
                        <a href="/companhiaAerea" className={styles.cancelButton}>
                            Cancelar
                        </a>
                        <button type="submit" className={styles.submitButton}>
                            <span className={styles.buttonIcon}>✓</span>
                            Cadastrar Companhia Aérea
                        </button>
                    </div>
                </form>
            </div>

            {/* Informações úteis */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    Informações importantes
                </h3>
                <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoBadge}>📝</span>
                        <div>
                            <strong>Nome completo</strong>
                            <p>Digite o nome oficial da companhia aérea</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoBadge}>🔤</span>
                        <div>
                            <strong>Código IATA</strong>
                            <p>2 letras que identificam a companhia (ex: LA para LATAM)</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoBadge}>⚠️</span>
                        <div>
                            <strong>Atenção</strong>
                            <p>Campos marcados com * são obrigatórios</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TelaNovaCompanhiaAerea;