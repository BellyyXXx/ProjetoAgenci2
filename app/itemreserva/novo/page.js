import { redirect } from 'next/navigation';
import { ItemReserva } from "../../../database/tables";

async function insertItemReserva(formData) {
    'use server';

    const dados = {
        valorTotal: parseFloat(formData.get('valorTotal')),
        QuantServices: parseInt(formData.get('QuantServices')),
        Observacoes: formData.get('Observacoes'),
        reservaid: parseInt(formData.get('reservaid')),
        servicold: parseInt(formData.get('servicold'))
    }

    await ItemReserva.create(dados);
    redirect('/itemreservas');
}

function TelaNovoItemReserva() {
    return (
        <>
            <h1>Novo Item de Reserva</h1>
            <form action={insertItemReserva}>
                <label htmlFor="valorTotal">Valor Total</label><br />
                <input type="number" name="valorTotal" step="0.01" required /><br />

                <label htmlFor="QuantServices">Quantidade de Serviços</label><br />
                <input type="number" name="QuantServices" min="1" required /><br />

                <label htmlFor="Observacoes">Observações</label><br />
                <textarea name="Observacoes" rows="3"></textarea><br />

                <label htmlFor="reservaid">Reserva ID</label><br />
                <input type="number" name="reservaid" required /><br />

                <label htmlFor="servicold">Serviço ID</label><br />
                <input type="number" name="servicold" required /><br />
                <hr />

                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
}

export default TelaNovoItemReserva;