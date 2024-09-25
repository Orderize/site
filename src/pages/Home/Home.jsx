import React from 'react';
import styles from './Home.module.css';

import Beneficio from '../../components/Benefits/Benefits';
import Formulario from '../../components/Form/Form';
import Funcionalidade from '../../components/Features/Features';

import imgPizzasBanner from "../../utils/assets/imgsPizzaBanner.png";
import imgGestao from "../../utils/assets/imgsGestao.svg";
import imgAnalise from "../../utils/assets/imgsAnalise.svg";
import imgSistDed from "../../utils/assets/imgSistDed.svg";
import atendente from "../../utils/assets/atendente.svg";
import insight from "../../utils/assets/insight.svg";
import quebraCabeca from "../../utils/assets/quebraCabeca.svg";

import { IoMenuOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div className={styles['body']}>
      <header>
        <div className={styles['menu']}>
          <IoMenuOutline className={styles["menu-icon"]} />
          <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className={styles['menu-icon-acessebility']} />
        </div>


        <div className={styles["content"]}>
          <h1>Um Sistema de Gestão Inovador!</h1>
          <p>Aumente a eficiência e ofereça um atendimento excepcional.</p>
          <p>Adquira agora e leve seu negócio ao próximo nível!</p>

          <div className={styles['buttonImage']}>
            <button className={styles["button"]}>Saiba mais</button>
            <img  src={imgPizzasBanner}  alt="Pizzas" className={styles["pizzasBanner"]} />
          </div>

        </div>
      </header>


      <div className={styles['features']}>
        <h1>Funcionalidades do sistema</h1>
        <Funcionalidade
          icon={imgGestao}
          title="Gestão de Pedidos"
        />

        <Funcionalidade
          icon={imgAnalise}
          title="Análise de Dados"
        />
  
          <Funcionalidade
            icon={imgSistDed}
            title="Sistemas Dedicados"
          />

      </div>

      <div className={styles['benefits']}>
        <h1>Principais Benefícios</h1>
        <Beneficio
          icon={atendente} alt="atendente e um relógio"
          title="Agilidade no Atendimento"
        />

        <Beneficio
          icon={quebraCabeca} alt="quebra-cabeça"
          title="Infomação fluída entre as etapas"
        />

        <Beneficio
          icon={insight} alt="lâmpada de idéias e gráfico"
          title="Insights valiosos"
        />

      </div>

      <div className={styles['form']}>
        <h1>Conheça a Orderize!</h1>
        <p><span className={styles['spanForm']}>
          Sempre prontos para ouvir você!</span>Entre em contato conosco.</p>
        <Formulario></Formulario>


      </div>
    </div>

  );
};

export default Home;
