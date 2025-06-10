import React from "react";
import Item from "@/components/Item/Item";
import CardProduto from "@/components/CardProduto/CardProduto" 
import "./Index.css";

const ListItens = ({ itens, image, functions }) => {
    return (
        <section className="conteiner-list">
            {
                itens.length > 0 && 
                itens.map((item, idx) => {
                    return <CardProduto 
                        key={idx}
                        imagem={image}
                        titulo={item.name}
                        subtitulo={item.id}
                        preco={item.price}
                        descricao={item.description}
                        onEdit={() => functions.handleEditClick(item)}
                        onDelete={() => functions.handleDeleteClick(item)}
                    />
                })
            }
        </section>
    );
};

export default ListItens;