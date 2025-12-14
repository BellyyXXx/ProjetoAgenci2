export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { Reserva, Cliente } from "../../database/tables";

async function deletarReserva(formData) {
    'use server';
    const id = formData.get('id');
    const reserva = await Reserva.findByPk(id);
    await reserva.destroy();
    redirect('/reserva');
}

async function TelaReservas() {
    const reservas = await Reserva.findAll({
        include: Cliente,
    });

    return (
        <div>
            <h1>Reservas</h1>
            <a href="/reserva/novo">Nova Reserva</a>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data Reserva</th>
                        <th>Valor Total</th>
                        <th>Status</th>
                        <th>Pagamento</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {reservas.map((reserva) => {
                        return (
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                <td>{reserva.data_reserva ? new Date(reserva.data_reserva).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{reserva.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{reserva.status}</td>
                                <td>{reserva.pagamento}</td>
                                <td>{reserva.createdAt ? new Date(reserva.createdAt).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{reserva.updatedAt ? new Date(reserva.updatedAt).toLocaleDateString('pt-BR') : ''}</td>

                                
                                <td>{reserva.Cliente?.nome}</td>

                                <td>
                                    <form action={deletarReserva}>
                                        <input type="hidden" name="id" defaultValue={reserva.id} />
                                        <button>Excluir</button>
                                    </form>
                                    <form action={'/reserva/altera'}>
                                        <input type="hidden" name="id" defaultValue={reserva.id}/> 
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

export default TelaReservas;
