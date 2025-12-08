// app/aeroportos/novo/page.js
import { Aeroporto } from "../../../database/tables";
import { redirect } from "next/navigation";
import styles from './NovoAeroporto.module.css';

async function insertAeroporto(formData) {
    'use server'
    
    const dados = {
        nome: formData.get("nome"),
        cidade: formData.get("cidade"),
        sigla: formData.get("sigla"),
        terminais: formData.get("terminais") || null
    };
    
    await Aeroporto.create(dados);
    redirect("/aeroportos");
}

function TelaNovoAeroporto() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>🏗️ Novo Aeroporto</h1>
                <p className={styles.subtitle}>Cadastre um novo aeroporto no sistema</p>
            </div>

            <div className={styles.formContainer}>
                <form action={insertAeroporto} className={styles.form}>
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
                                    placeholder="Ex: Aeroporto Internacional de São Paulo"
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
                                    placeholder="Ex: São Paulo"
                                    required
                                />
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className={styles.formColumn}>
                            {/* Sigla (IATA) */}
                            <div className={styles.formGroup}>
                                <label htmlFor="sigla" className={styles.label}>
                                    Código IATA *
                                </label>
                                <input 
                                    type="text" 
                                    id="sigla"
                                    name="sigla" 
                                    className={styles.input}
                                    placeholder="Ex: GRU"
                                    required
                                    maxLength="3"
                                    pattern="[A-Z]{3}"
                                    title="3 letras maiúsculas"
                                    style={{ textTransform: 'uppercase' }}
                                />
                                <small className={styles.helperText}>
                                    3 letras maiúsculas (ex: GRU, CGH, SDU)
                                </small>
                            </div>

                            {/* Terminais */}
                            <div className={styles.formGroup}>
                                <label htmlFor="terminais" className={styles.label}>
                                    Número de Terminais
                                </label>
                                <input 
                                    type="number" 
                                    id="terminais"
                                    name="terminais" 
                                    className={styles.input}
                                    placeholder="Ex: 3"
                                    min="1"
                                    max="20"
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
                            <span className={styles.buttonIcon}>✈️</span>
                            Cadastrar Aeroporto
                        </button>
                    </div>
                </form>
            </div>

            {/* Informações úteis */}
            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>📋 Informações importantes</h3>
                <ul className={styles.infoList}>
                    <li>O código IATA deve ter exatamente 3 letras maiúsculas</li>
                    <li>Exemplos de códigos IATA: GRU (Guarulhos), CGH (Congonhas), SDU (Santos Dumont)</li>
                    <li>O número de terminais é opcional e pode ser adicionado posteriormente</li>
                    <li>Certifique-se de que o aeroporto não está duplicado no sistema</li>
                </ul>
            </div>
        </div>
    );
}

export default TelaNovoAeroporto;