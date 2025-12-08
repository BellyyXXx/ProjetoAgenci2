import { redirect } from 'next/navigation';
import { CompanhiaAerea } from "../../../database/tables";


async function insertCompanhiaAerea(formData) {

    'use server';

    const dados = {

        nome: formData.get('nome'),
        codigoIATA: formData.get('codigoIATA')

    }

    await CompanhiaAerea.create(dados);

    redirect('/companhiaAerea');

}


function TelaNovaCompanhiaAerea() {

    return (

        <>

            <form action={insertCompanhiaAerea}>

                <label htmlFor="Nome">Nome</label><br />
                <input type="text" name="nome" /><br />

                <label htmlFor="codigoIATA">Código IATA</label><br />
                <input type="text" name="codigoIATA" /><br />
                <hr />

                <button>Cadastrar</button>

            </form>

        </>

    );

}



export default TelaNovaCompanhiaAerea;