import { redirect } from 'next/navigation';
import { Servico } from "../../database/tables";

async function deletarServicos(formData) {
    'use server';
    const id = formData.get('id');
    const servicos = await Servico.findByPk(id);
    await servicos.destroy();
    redirect('/servicos');
}

async function TelaServicos() {

    const servicos = await Servico.findAll({
        include: [],
    });

    return (

        <div>

            <h1>Serviços</h1>
            <a href="/servicos/novo/">Novo Serviço</a>

            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nome do Serviço</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Preço Médio R$</th>
                        <th>Duração</th>
                        <th>Ações</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        servicos.map(function (servico) {

                            return (

                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.descricao}</td>
                                    <td>{servico.categoria}</td>
                                    <td>{servico.preco}</td>
                                    <td>{servico.duracao}</td>

                                    <td>
                                        <form action={deletarServicos}>
                                            <input type="hidden" name="id" defaultValue={servico.id} />
                                            <button>Excluir</button>
                                        </form>
                                        <form action = {'/servicos/altera'}>
                                            <input type="hidden" name="id" defaultValue={servico.id}/> 
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



export default TelaServicos;