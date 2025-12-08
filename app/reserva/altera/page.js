import { redirect } from "next/navigation";
import { Reserva, Cliente } from "../../../database/tables";

async function editaReserva(formData) {
    'use server'
    const id = formData.get('id');
    const data_reserva = formData.get('data_reserva');
    const valorTotal = formData.get('valorTotal');
    const status = formData.get('status');
    const pagamento = formData.get('pagamento');
    const IDCliente = formData.get('IDCliente');

    const reserva = await Reserva.findByPk(id);

    reserva.data_reserva = data_reserva;
    reserva.valorTotal = parseFloat(valorTotal);
    reserva.status = status;
    reserva.pagamento = pagamento;
    reserva.IDCliente = parseInt(IDCliente);

    await reserva.save();
    redirect('/reserva');
}

async function TelaEditaReserva({ searchParams }) {
    const id = searchParams.id;
    const reserva = await Reserva.findByPk(id);

    // 🔥 Aqui estava o erro (Clientes → Cliente)
    const clientes = await Cliente.findAll();

    const dataReservaFormatada = reserva.data_reserva
        ? new Date(reserva.data_reserva).toISOString().slice(0, 16)
        : '';

    return (
        <>
            <h1>Editando Reserva</h1>

            <form action={editaReserva}>
                <input type="hidden" name="id" defaultValue={reserva.id} />

                <label>Data da Reserva</label> <br/>
                <input type="datetime-local" name="data_reserva" defaultValue={dataReservaFormatada} /> <br/>

                <label>Valor Total</label> <br/>
                <input type="number" name="valorTotal" step="0.01" defaultValue={reserva.valorTotal} /> <br/>

                <label>Status</label> <br/>
                <select name="status" defaultValue={reserva.status}>
                    <option value="PENDENTE">Pendente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="CANCELADA">Cancelada</option>
                </select> <br/>

                <label>Pagamento</label> <br/>
                <input type="text" name="pagamento" defaultValue={reserva.pagamento} /> <br/>

                {/* SELECT COM CHAVE ESTRANGEIRA */}
                <label>Cliente</label> <br/>
                <select name="IDCliente" defaultValue={reserva.clienteId}>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select> <br/>

                <button type="submit">Salvar Alterações</button>
            </form>
        </>
    );
}

export default TelaEditaReserva;
