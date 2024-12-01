import React from "react";
import { ChartDonut, Pizza } from "@phosphor-icons/react";

export const isUserOwner = (roles) => roles.some(role => role.name == "OWNER");

export const getMainButton = (isOwner) => ({
    title: isOwner ? "Relatórios" : "Pedidos",
    icon: isOwner ? <ChartDonut size={37} /> : <Pizza size={37} />,
    path: isOwner ? "/relatorios" : "/pedidos",
});