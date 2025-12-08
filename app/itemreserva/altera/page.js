import { redirect } from "next/navigation";
import { ItemReserva } from "../../../database/tables";

async function editaItemReserva(formData) {
    'use server'
    const id = formData.get('id');
    const valorTotal = formData.get('valorTotal');
    const QuantServices = formData.get('QuantServices');
    const Observacoes = formData.get('Observacoes');
    const reservaid = formData.get('reservaid');
    const servicold = formData.get('servicold');

    const item = await ItemReserva.findByPk(id);

    item.valorTotal = parseFloat(valorTotal);
    item.QuantServices = parseInt(QuantServices);
    item.Observacoes = Observacoes;
    item.reservaid = parseInt(reservaid);
    item.servicold = parseInt(servicold);
    
    await item.save();
    redirect('/itemreservas');
}

async function TelaEditaItemReserva({ searchParams }) {
    const id = searchParams.id;
    const itemReserva = await ItemReserva.findByPk(id);
    
    return (
        <>
            <h1>Editando Item de Reserva</h1>

            <form action={editaItemReserva}>
                <input type="hidden" name="id" defaultValue={itemReserva.id} />
           
                <label htmlFor="valorTotal">Valor Total</label> <br/>
                <input type="number" name="valorTotal" step="0.01" defaultValue={itemReserva.valorTotal} /> <br/>

                <label htmlFor="QuantServices">Quantidade de Serviços</label> <br/>
                <input type="number" name="QuantServices" min="1" defaultValue={itemReserva.QuantServices} /> <br/>

                <label htmlFor="Observacoes">Observações</label> <br/>
                <textarea name="Observacoes" rows="3" defaultValue={itemReserva.Observacoes} /> <br/>

                <label htmlFor="reservaid">Reserva ID</label> <br/>
                <input type="number" name="reservaid" defaultValue={itemReserva.reservaid} /> <br/>

                <label htmlFor="servicold">Serviço ID</label> <br/>
                <input type="number" name="servicold" defaultValue={itemReserva.servicold} /> <br/>

                <button type="submit">Salvar Alterações</button>   
            </form>
        </>
    );
}

export default TelaEditaItemReserva;