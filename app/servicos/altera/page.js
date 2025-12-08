import { redirect } from "next/navigation";
import { Servico } from "../../../database/tables";

async function editaServico(formData) {
    'use server'

    const id = formData.get('id');
    const nome = formData.get('nome');
    const categoria = formData.get('categoria');
    const descricao = formData.get('descricao');
    const preco = parseFloat(formData.get('preco'));
    const duracao = formData.get('duracao');

    const serv = await Servico.findByPk(id);

    serv.nome = nome;
    serv.categoria = categoria;
    serv.descricao = descricao;
    serv.preco = preco;
    serv.duracao = duracao;
    
    await serv.save();
    redirect('/servicos');
}

async function TelaEditaServico({ searchParams }) {
    const id = searchParams.id;
    const servico = await Servico.findByPk(id);
    
    return (
        <>
            <h1>Editando Serviço</h1>

            <form action={editaServico}>
                <input type="hidden" name="id" defaultValue={servico.id} />
           
                <label htmlFor="nome">Nome do Serviço</label> <br/>
                <input type="text" name="nome" defaultValue={servico.nome} /> <br/>

                <label htmlFor="categoria">Categoria</label> <br/>
                <input type="text" name="categoria" defaultValue={servico.categoria} /> <br/>

                <label htmlFor="descricao">Descrição</label> <br/>
                <textarea name="descricao" rows="4" cols="50" defaultValue={servico.descricao} /> <br/>

                <label htmlFor="preco">Preço (R$)</label> <br/>
                <input type="number" name="preco" step="0.01" defaultValue={servico.preco} /> <br/>

                <label htmlFor="duracao">Duração</label> <br/>
                <input type="text" name="duracao" placeholder="Ex: 6h, 1 dia, 30min" defaultValue={servico.duracao} /> <br/>

                <button type="submit">Salvar Alterações</button>   
            </form>
        </>
    );
}

export default TelaEditaServico;