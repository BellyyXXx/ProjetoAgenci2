import { redirect } from "next/navigation";
import { CompanhiaAerea } from "../../../database/tables";

async function editaCompanhiaAereao(formData) {
    'use server'
    const id = formData.get('id');
    const nome = formData.get('nome');
    const codigoIATA = formData.get('codigoIATA');

    const comp = await CompanhiaAerea.findByPk(id);

    comp.nome = nome;
    comp.codigoIATA = codigoIATA;
    
    await comp.save();
    redirect('/companhiaAerea');
}

async function TelaEditaCompanhiaAerea({ searchParams }) {
    const id = searchParams.id;
    const companhiaAerea = await CompanhiaAerea.findByPk(id);
    
    return (
        <>
            <h1>Editando Companhia Aerea</h1>

            <form action={editaCompanhiaAereao}>
                <input type="hidden" name="id" defaultValue={companhiaAerea.id} />
           
                <label htmlFor="nome">Nome</label> <br/>
                <input type="text" name="nome" defaultValue={companhiaAerea.nome} /> <br/>

                <label htmlFor="codigoIATA">Codigo IATA</label> <br/>
                <input type="text" name="codigoIATA" defaultValue={companhiaAerea.codigoIATA} /> <br/>

                <button type="submit">Salvar Alterações</button>   
            </form>
        </>
    );
}

export default TelaEditaCompanhiaAerea;