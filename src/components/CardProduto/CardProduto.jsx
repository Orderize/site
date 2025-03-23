import React from 'react';
import styles from './CardProduto.module.css';
import ActionButton from '../ActionButton/ActionButton';
import { isOwner } from '../../utils/user/userRoles';

const CardProduto = ({ 
    imagem, 
    titulo, 
    subtitulo, 
    descricao, 
    preco, 
    onEdit, 
    onDelete
 }) => {

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardContent}>
                <img src={imagem} alt={titulo} className={styles.image} />

                <div className={styles.text}> 
                    <p className={styles.titulo}>{titulo}</p>
                    <p className={styles.subtitulo}>Código: {subtitulo}</p>
                    <p className={styles.preco}>R$ {preco.toFixed(2)}</p>
                    <p className={styles.descricao}>Descrição: {descricao}</p>
                </div>
            </div>

            
            {isOwner() && onEdit && onDelete &&
                <div className={styles.buttonContainer}>
                    <ActionButton label="Editar" onClick={onEdit} action="edit" width="90px" height="20px"/>
                    <ActionButton label="Excluir" onClick={onDelete} action="delete" width="90px" height="20px"/>
                </div>
            }
        </div>
    );
};

export default CardProduto;