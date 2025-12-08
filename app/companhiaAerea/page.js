import { redirect } from 'next/navigation';
import { CompanhiaAerea } from "../../database/tables";

async function deletarCompanhiaAerea(formData) {
    'use server';
    const id = formData.get('id');
    const companhiaAerea = await CompanhiaAerea.findByPk(id);
    await companhiaAerea.destroy();
    redirect('/companhiaAerea');
}


async function TelaCompanhiaAerea() {

    const companhiaAerea = await CompanhiaAerea.findAll();
    console.log(companhiaAerea);

    return (

        <div>

            <h1>Companhia Aerea</h1>
            <a href="/companhiaAerea/novo">Nova Companhia Aerea</a>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CódigoIATA</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {

                        companhiaAerea.map(function (comp) {

                            return (

                                <tr key={comp.id}>
                                    <td>{comp.id}</td>
                                    <td>{comp.nome}</td>
                                    <td>{comp.codigoIATA}</td>

                                    <td>
                                        <form action={deletarCompanhiaAerea}>
                                            <input type="hidden" name="id" defaultValue={comp.id} />
                                            <button>Excluir</button>
                                        </form>
                                        <form action = {'/companhiaAerea/altera'}>
                                            <input type="hidden" name="id" defaultValue={comp.id}/> 
                                            <button>Editar</button>

                                        </form>
                                    </td>
                                </tr>

                            )

                        })

                    }

                </tbody>



            </table>



        </div>

    );

}

export default TelaCompanhiaAerea;