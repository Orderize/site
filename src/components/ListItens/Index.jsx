import React from "react";
import Item from "@/components/Item/Item";
import "./Index.css";

const ListItens = ({ itens }) => {
    return (
        <section className="conteiner-list">
            {
                itens.length > 0 && 
                itens.map(item => {
                    return <Item 
                        type={"drink"}
                        cod={item.id}
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                    />
                })
            }
        </section>
    );
};

export default ListItens;