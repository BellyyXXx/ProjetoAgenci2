import { Servico } from "../../../database/tables";
import styles from './EditarServico.module.css';

async function TelaEditaServico({ searchParams }) {

    const { id } = await searchParams;
    
    if (!id) {
        return (
            <div className={styles.container}>
                <h1>Editar Serviço</h1>
                <p>ID do serviço não fornecido.</p>
            </div>
        );
    }

    const servico = await Servico.findByPk(id);

    // Se não encontrar o serviço
    if (!servico) {
        return (
            <div className={styles.container}>
                <h1>Editar Serviço</h1>
                <p>Serviço não encontrado.</p>
            </div>
        );
    }

    // Converter preco para número para evitar erro toFixed()
    const precoNumerico = Number(servico.preco) || 0;

    async function handleSubmit(formData) {
        'use server';
        
        const nome = formData.get('nome');
        const categoria = formData.get('categoria');
        const descricao = formData.get('descricao');
        const preco = parseFloat(formData.get('preco'));
        const duracao = formData.get('duracao');
        
        try {
            await Servico.update(
                { nome, categoria, descricao, preco, duracao },
                { where: { id } }
            );
            

            redirect('/servicos');
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Editar Serviço</h1>
            
            <div className={styles.serviceCard}>
                <div className={styles.serviceInfo}>
                    <span className={styles.serviceBadge}>
                        {/* Correção: usar preco convertido para número */}
                        R$ {precoNumerico.toFixed(2)}
                    </span>
                    <div>
                        <span className={styles.serviceName}>{servico.nome}</span>
                        <span className={styles.serviceCategory}>{servico.categoria}</span>
                    </div>
                </div>
                
                <form action={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome do Serviço</label>
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            defaultValue={servico.nome}
                            required 
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="categoria">Categoria</label>
                        <select 
                            id="categoria" 
                            name="categoria" 
                            defaultValue={servico.categoria}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Voo">Voo</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Pacote">Pacote</option>
                            <option value="Transfer">Transfer</option>
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea 
                            id="descricao" 
                            name="descricao" 
                            defaultValue={servico.descricao}
                            rows="4"
                        />
                    </div>
                    
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="preco">Preço (R$)</label>
                            <input 
                                type="number" 
                                id="preco" 
                                name="preco" 
                                step="0.01"
                                defaultValue={precoNumerico}
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="duracao">Duração</label>
                            <input 
                                type="text" 
                                id="duracao" 
                                name="duracao" 
                                defaultValue={servico.duracao}
                                placeholder="Ex: 3 dias, 2 horas"
                            />
                        </div>
                    </div>
                    
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                            Salvar Alterações
                        </button>
                        <a href="/servicos" className={styles.cancelButton}>
                            Cancelar
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TelaEditaServico;