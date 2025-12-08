import { redirect } from 'next/navigation';
import { Servico } from "../../../database/tables";


async function insertServico(formData) {

    'use server';

    const dados = {

        nome: formData.get('nome'),
        descricao: formData.get('descricao'),
        categoria: formData.get('categoria'),
        preco: formData.get('preco'),
        duracao: formData.get('duracao'),
        disp: formData.get('disp'),
        destaque: formData.get('destaque')

    }

    await Servico.create(dados);

    redirect('/servicos');

}



function TelaNovoServico() {

    return (

        <>

            <form action={insertServico}>

                <label htmlFor="nome">Nome Servico</label><br />
                <input type="text" name="nome" /><br />

                <label htmlFor="descricao">Descricao</label><br />
                <input type="text" name="descricao" /><br />
                
                <label htmlFor="categoria">Categoria</label><br />
                <input type="text" name="categoria" /><br />

                <label htmlFor="preco">Preco Médio</label><br />
                <input type="text" name="preco" /><br />

                <label htmlFor="duracao">Duração</label><br />
                <input type="text" name="duracao" /><br />

                <button>Cadastrar</button>

            </form>

        </>

    );

}



export default TelaNovoServico;