import { redirect } from 'next/navigation';
import { Destino } from "../../../database/tables";



async function insertDestino(formData) {

    'use server';

    const dados = {

        nome: formData.get('nome'),
        descricao: formData.get('descricao'),
        cidade: formData.get('cidade'),
        pais: formData.get('pais')

    }

    await Destino.create(dados);

    redirect('/destino');

}


function TelaNovoDestino() {

    return (

        <>

            <form action={insertDestino}>

                <label htmlFor="nome">Nome</label><br />
                <input type="text" name="nome" /><br />

                <label htmlFor="descricao">Descricao</label><br />
                <input type="text" name="descricao" /><br />
                
                <label htmlFor="cidade">Cidade</label><br />
                <input type="text" name="cidade" /><br />

                <label htmlFor="pais">Pais</label><br />
                <input type="text" name="pais" /><br />
                <hr />

                <button>Cadastrar</button>

            </form>

        </>

    );

}



export default TelaNovoDestino;