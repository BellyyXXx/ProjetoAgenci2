import { redirect } from "next/navigation";
import { Destino } from "../../../database/tables";

async function editaDestino(formData) {
    'use server'

    const id = formData.get('id');
    const nome = formData.get('nome');
    const descricao = formData.get('descricao');
    const cidade = formData.get('cidade');
    const pais = formData.get('pais');

    const dest = await Destino.findByPk(id);

    dest.nome = nome;
    dest.descricao = descricao;
    dest.cidade = cidade;
    dest.pais = pais;
    
    await dest.save();
    redirect('/destino');
}

async function TelaEditaDestino({ searchParams }) {
    const id = searchParams.id;
    const destino = await Destino.findByPk(id);
    
    return (
        <>
            <h1>Editando Destino</h1>

            <form action={editaDestino}>
                <input type="hidden" name="id" defaultValue={destino.id} />
           
                <label htmlFor="nome">Nome</label> <br/>
                <input type="text" name="nome" defaultValue={destino.nome} /> <br/>

                <label htmlFor="descricao">Descrição</label> <br/>
                <textarea name="descricao" defaultValue={destino.descricao} /> <br/>

                <label htmlFor="cidade">Cidade</label> <br/>
                <input type="text" name="cidade" defaultValue={destino.cidade} /> <br/>

                <label htmlFor="pais">País</label> <br/>
                <input type="text" name="pais" defaultValue={destino.pais} /> <br/>

                <button type="submit">Salvar Alterações</button>   
            </form>
        </>
    );
}

export default TelaEditaDestino;