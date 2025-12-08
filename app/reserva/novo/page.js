import { redirect } from 'next/navigation'; 
import { Reserva, Cliente } from "../../../database/tables";

async function insertReserva(formData) {
    'use server';

    const dados = {
        data_reserva: formData.get('data_reserva'),
        valorTotal: parseFloat(formData.get('valorTotal')),
        status: formData.get('status'),
        pagamento: formData.get('pagamento'),
        clienteId: parseInt(formData.get('clienteId')) // ✅ CORRIGIDO
    }

    await Reserva.create(dados);
    redirect('/reserva');
}

async function TelaNovaReserva() {

    const clientes = await Cliente.findAll();

    return (
        <>
            <h1>Nova Reserva</h1>

            <form action={insertReserva}>
                <label>Data da Reserva</label><br />
                <input type="datetime-local" name="data_reserva" required /><br />

                <label>Valor Total</label><br />
                <input type="number" name="valorTotal" step="0.01" required /><br />

                <label>Status</label><br />
                <select name="status" required>
                    <option value="PENDENTE">Pendente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="CANCELADA">Cancelada</option>
                </select><br />

                <label>Pagamento</label><br />
                <input type="text" name="pagamento" required /><br />

                
                <label>Cliente</label><br />
                <select name="clienteId" required>
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select><br />

                <hr />
                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
}

export default TelaNovaReserva;
