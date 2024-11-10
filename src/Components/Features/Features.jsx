import React, { useState } from "react";
import styles from "./Features.module.css";
import { CiCirclePlus } from "react-icons/ci";

function Funcionalidade({ icon, iconDesktop, title, texto, fact1, fact2, inverterOrdemDesktop }) {

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const toggleIconPlus = () => setIsDescriptionOpen(!isDescriptionOpen);

  const desciptionBlockClass = `${styles.desciptionBlock} ${isDescriptionOpen ? styles.active : ''}`;

  // console.log("Esse icone aqui" + JSON.stringify(icon))

  return (
    <div className={styles["features"]}>
      <div className={styles["mobile"]}>
        {/* mobile */}
        <div className={styles["icon-container"]}>
          <img src={icon} alt={title} className={styles["icon-img-mobile"]} />
        </div>
        <div className={styles["title-iconPlus"]}>
          <h3 className={styles["title"]}>{title}</h3>
          <CiCirclePlus className={styles["iconPlus"]} onClick={toggleIconPlus}/>
        </div>
        <div className={desciptionBlockClass}>
          <p className={styles["description"]}>{texto}</p>
          <div className={styles["facts"]}>
            <p>{fact1}</p>
            <p>{fact2}</p>
          </div>
        </div>
      </div>

      <div className={styles["desktop"]}>
        {/* desktop */}
        {inverterOrdemDesktop ? (
          <div className={styles["funcionalidade-invertida"]}>
            {/* Conteúdo invertido */}
            <div className={styles["titleText"]}>
              <h3>{title}</h3>
              <hr />
              <p className={styles["description"]}>{texto}</p>
              <div className={styles["facts"]}>
                <p>{fact1}</p>
                <p>{fact2}</p>
              </div>
            </div>
            <div className={styles["icon-container"]}>
              <img src={iconDesktop} alt={title} className={styles["icon-img-desktop"]} />
            </div>
          </div>
        ) : (
          <div className={styles["funcionalidade"]}>
            <div className={styles["icon-container"]}>
              <img src={iconDesktop} alt={title} className={styles["icon-img-desktop"]} />
            </div>
            <div className={styles["titleText"]}>
              <h3>{title}</h3>
              <hr />
              <p className={styles["description"]}>{texto}</p>
              <div className={styles["facts"]}>
                <p>{fact1}</p>
                <p>{fact2}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Funcionalidade;