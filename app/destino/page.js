import { redirect } from 'next/navigation';
import { Destino } from "../../database/tables";

async function deletarDestino(formData) {
    'use server';
    const id = formData.get('id');
    const destino = await Destino.findByPk(id);
    await destino.destroy();
    redirect('/destino');
}

async function Destinos() {

    const destinos = await Destino.findAll();

    return (

        <div>

            <h1>Destinos</h1>
            <a href="/destino/novo">Novo Destino</a>

            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Cidade</th>
                        <th>Pais</th>
                        <th>Ações</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        destinos.map(function (destino) {

                            return (

                                <tr key={destino.id}>
                                    <td>{destino.id}</td>
                                    <td>{destino.nome}</td>
                                    <td>{destino.descricao}</td>
                                    <td>{destino.cidade}</td>
                                    <td>{destino.pais}</td>

                                    <td>
                                        <form action={deletarDestino}>
                                            <input type="hidden" name="id" defaultValue={destino.id} />
                                            <button>Excluir</button>
                                        </form>
                                        <form action = {'/destino/altera'}>
                                            <input type="hidden" name="id" defaultValue={destino.id}/> 
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



export default Destinos;
