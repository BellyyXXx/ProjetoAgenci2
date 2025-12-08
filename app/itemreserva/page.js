import { redirect } from 'next/navigation';
import { ItemReserva } from "../../database/tables";

async function deletarItemReserva(formData) {
    'use server';
    const id = formData.get('id');
    const itemReserva = await ItemReserva.findByPk(id);
    await itemReserva.destroy();
    redirect('/itemreservas');
}

async function TelaItemReservas() {
    const itemReservas = await ItemReserva.findAll();

    return (
        <div>
            <h1>Itens de Reserva</h1>
            <a href="/itemreservas/novo">Novo Item de Reserva</a>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Valor Total</th>
                        <th>Quantidade de Serviços</th>
                        <th>Observações</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Reserva ID</th>
                        <th>Serviço ID</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {itemReservas.map(function (item) {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{item.QuantServices}</td>
                                <td>{item.Observacoes}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{item.reservaid}</td>
                                <td>{item.servicold}</td>

                                <td>
                                    <form action={deletarItemReserva}>
                                        <input type="hidden" name="id" defaultValue={item.id} />
                                        <button>Excluir</button>
                                    </form>
                                    <form action={'/itemreservas/altera'}>
                                        <input type="hidden" name="id" defaultValue={item.id}/> 
                                        <button>Editar</button>
                                    </form>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TelaItemReservas;