import React from "react";
import styles from "./Features.module.css";

function Funcionalidade({ icon, iconDesktop, title, texto, fact1, fact2, inverterOrdemDesktop }) {
  return (
    <div className={styles["features"]}>
      <div className={styles["mobile"]}>
        {/* mobile */}
        <div className={styles["icon-container"]}>
          <img src={icon} alt={title} className={styles["icon-img-mobile"]} />
        </div>
        <h3 className={styles["title"]}>{title}</h3>
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
            {/* Conteúdo na ordem padrão */}
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