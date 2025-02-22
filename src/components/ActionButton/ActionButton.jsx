import React from "react";
import styles from "./ActionButton.module.css";
import { NotePencil, Trash, ListPlus } from "@phosphor-icons/react";

const ActionButton = ({ label, onClick, className, action, width, height}) => {
    const getActionClass = () => {
        switch (action) {
            case "edit":
                return styles.edit;
            case "delete":
                return styles.delete;
            case "add":
                return styles.add;
            default:
                return styles.edit;
        }
    };

    // const getColor = () => {
    //     switch (action) {
    //         case "edit":
    //             return "var(--cor-fundo)"; // Branco
    //         case "delete":
    //             return "var(--cor-fundo)"; // Branco
    //         case "add":
    //             return "v"; // Branco
    //         default:
    //             return "var(--cor-fundo)"; // Preto (padrão)
    //     }
    // }

    const renderIcon = () => {
        switch (action) {
          case "edit":
            return <NotePencil size={20} weight="duotone" />;
          case "delete":
            return <Trash size={20} weight="duotone" />;
            case "add":
                return <ListPlus size={20} weight="duotone" />;
          default:
            return null;
        }
      };

  return (
    <button 
      className={`${styles["action-button"]} ${className} ${getActionClass()} ${className}`} 
      style={{ width, height }}
      onClick={onClick}
    >
      {renderIcon()}
      {label && 
        <span>{label}</span>
    }
    </button>
  );
};

export default ActionButton;
