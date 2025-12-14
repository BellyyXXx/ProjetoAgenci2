// app/destino/altera/actions.js - ADICIONE esta função
'use server';

import { redirect } from "next/navigation";
import { Destino } from "../../../database/tables";

// Função para buscar destino pelo ID
export async function buscarDestinoPorId(id) {
    try {
        const dest = await Destino.findByPk(id);
        if (!dest) return null;
        // Converte para objeto simples para serialização
        return JSON.parse(JSON.stringify(dest));
    } catch (error) {
        console.error('Erro ao buscar destino:', error);
        return null;
    }
}

export async function editaDestino(formData) {
    const id = formData.get('id');
    const nome = formData.get('nome');
    const descricao = formData.get('descricao');
    const cidade = formData.get('cidade');
    const pais = formData.get('pais');

    const dest = await Destino.findByPk(id);

    if (!dest) {
        throw new Error("Destino não encontrado");
    }

    dest.nome = nome;
    dest.descricao = descricao;
    dest.cidade = cidade;
    dest.pais = pais;
    
    await dest.save();
    redirect('/destino');
}