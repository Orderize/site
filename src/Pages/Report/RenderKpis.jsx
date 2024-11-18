import React from "react";
import Kpi from "./Kpi/Kpi";

const RenderKpis = ({ info, isDesktop }) => {
    if (!info) return null;

    return isDesktop ? (
        <>
            <Kpi background="#7B806A" color="#EAE5DE" title="Pedidos no dia" value={info.quantidadePedidos} />
            <Kpi background="#EAE5DE" color="#3A3C16" title="Faturamento Bruto" value={`R$ ${info.lucro.toFixed(2)}`} />
            <Kpi background="#656D4A" color="#EAE5DE" title="Popular da Semana" value="Calabreza" />
            <Kpi background="#B5B9A4" color="#3A3C16" title="Meta para o dia" value="R$ 3.125,00" />
        </>
    ) : (
        <>
            <Kpi background="#EAE5DE" color="#3A3C16" title="Faturamento Bruto" value={`R$ ${info.lucro.toFixed(2)}`} />
            <Kpi background="#656D4A" color="#EAE5DE" title="Pedidos no dia" value={info.quantidadePedidos} />
        </>
    );
};

export default RenderKpis;