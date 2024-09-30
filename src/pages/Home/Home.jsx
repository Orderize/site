import React from 'react';
import styles from './Home.module.css';

import Beneficio from '../../components/Benefits/Benefits';
import Formulario from '../../components/Form/Form';
import Funcionalidade from '../../components/Features/Features';

import imgPizzasBanner from "../../utils/assets/imgsPizzaBanner.png";
import imgGestao from "../../utils/assets/imgsGestao.svg";
import imgAnalise from "../../utils/assets/imgsAnalise.svg";
import atendente from "../../utils/assets/atendente.svg";
import insight from "../../utils/assets/insight.svg";
import quebraCabeca from "../../utils/assets/quebraCabeca.svg";
import logo from "../../utils/assets/logo.png"

import { IoMenuOutline } from "react-icons/io5";
import { IoIosTabletPortrait } from "react-icons/io";

const Home = () => {
  return (
    <div className={styles['body']}>
      <header>
        <div className={styles['menu']}>
          <IoMenuOutline className={styles["menu-icon"]} />
          <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className={styles['menu-icon-acessebility']} />
        </div>

        <nav className={styles['nav']}>
          <img src={logo} className={styles['imageLogo']} />
          <div className={styles['nav-acessibility']}>
            <ul className={styles['nav-links']}>
              <li><a href="#" className={styles['item-nav']}>Home</a></li>
              <li><a href="#" className={styles['item-nav']}>Nosso Sistema</a></li>
              <li><a href="#" className={styles['item-nav']}>Inovação</a></li>
              <li><a href="#" className={styles['item-nav']}>Benefícios</a></li>
            </ul>
            <div className={styles['icon-acessiblity']}>
              <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className={styles['menu-icon-acessebility-desktop']} />
            </div>
          </div>
        </nav>


        <div className={styles["content"]}>
          <div className={styles["mobile"]}>
            <h1>Um Sistema de Gestão Inovador!</h1>
            <p>Aumente a eficiência e ofereça um atendimento excepcional.</p>
            <p>Adquira agora e leve seu negócio ao próximo nível!</p>
          </div>

          <div className={styles["desktop"]}>
            <h1>Um Sistema de Gestão Inovador!</h1>
            <p>Revolucione sua pizzaria com o sistema mais completo do país. Aumente a eficiência e ofereça um atendimento excepcional.</p>
            <p>Adquira agora e leve seu negócio ao próximo nível!</p>
            <button className={styles["buttonDesktop"]}>Saiba mais</button>
          </div>

          <div className={styles['buttonImageMobile']}>
            <button className={styles["button"]}>Saiba mais</button>
            <img src={imgPizzasBanner} alt="Pizzas" className={styles["pizzasBanner"]} />
          </div>

          <div className={styles['imageDesktop']}>
            <img src={imgPizzasBanner} alt="Pizzas" className={styles["pizzasBannerDesktop"]} />
          </div>

        </div>
      </header>


      <div className={styles['features']}>
        <h1 className={styles['h1Mobile']}>Funcionalidades do sistema</h1>
        <h1 className={styles['h1Desktop']}>O que é Orderize?</h1>
        <Funcionalidade
          icon={imgGestao}
          title="Gestão de Pedidos"
        />

        <Funcionalidade
          icon={imgAnalise}
          title="Análise de Dados"
        />

        <Funcionalidade
          icon={<IoIosTabletPortrait className={styles["icon-sistDed"]} />}
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
