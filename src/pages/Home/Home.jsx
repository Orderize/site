import React from 'react';
import styles from './Home.module.css';

import Beneficio from '../../components/Benefits/Benefits';
import Formulario from '../../components/Form/Form';
import Funcionalidade from '../../components/Features/Features';
import Acessebility from '../../components/acessibility/acessibility';

import imgPizzasBanner from "../../utils/assets/imgsPizzaBanner.png";
import imgGestao from "../../utils/assets/imgsGestao.svg";
import imagem1 from '../../utils/assets/imgGestaoDesktop.svg';
import imgAnalise from "../../utils/assets/imgsAnalise.svg";
import imagem2 from '../../utils/assets/fatiaPizzaDesktop.svg';
import imagem3 from '../../utils/assets/imgGarcomPizzaioloDesktop.svg';
// import atendente from "../../utils/assets/atendente.svg";
import imgAtendente from "../../utils/assets/imgAtendente.png";
// import insight from "../../utils/assets/insight.svg";
import insight from "../../utils/assets/ideia.png";
// import quebraCabeca from "../../utils/assets/quebraCabeca.svg";
import quebraCabeca from "../../utils/assets/quebraCabecaa.png";
import logo from "../../utils/assets/logo.png";
import imgForm from "../../utils/assets/imgForm.svg";

import { IoMenuOutline } from "react-icons/io5";
import { IoIosTabletPortrait } from "react-icons/io";
import FooterHome from '../../components/FooterHome/FooterHome';

const Home = () => {
  return (
    <body>
      <header>
        <div className={styles['menu']}>
          <IoMenuOutline className={styles["menu-icon"]} />
          {/* <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className={styles['menu-icon-acessebility']} /> */}
        </div>

        <nav className={styles['nav']}>
          <img src={logo} className={styles['imageLogo']} />
          <div className={styles['nav-acessibility']}>
            <ul className={styles['nav-links']}>
              <li><a href="#" className={styles['item-nav']}>Home</a></li>
              <li><a href="#ourSystem" className={styles['item-nav']}>Nosso Sistema</a></li>
              <li><a href="#benefits" className={styles['item-nav']}>Benefícios</a></li>
              <li><a href="#contact" className={styles['item-nav']}>Fale Conosco</a></li>
            </ul>
            {/* <div className={styles['icon-acessiblity']}>
              <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className={styles['menu-icon-acessebility-desktop']} />
            </div> */}
            <Acessebility></Acessebility>
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
            <button className={styles["buttonDesktop"]}  onClick={() => document.getElementById("ourSystem").scrollIntoView({ behavior: 'smooth' })}>Saiba mais</button>
          </div>

          <div className={styles['buttonImageMobile']}>
            <div className={styles['buttonContainer']}>
              <button className={styles["button"]}>Saiba mais</button>

            </div>
            <img src={imgPizzasBanner} alt="Pizzas" className={styles["pizzasBanner"]} />
          </div>

          <div className={styles['imageDesktop']}>
            <img src={imgPizzasBanner} alt="Pizzas" className={styles["pizzasBannerDesktop"]} />
          </div>
        </div>
      </header>


      <div id="ourSystem" className={styles['features']}>
        <h1 className={styles['h1Mobile']}>Funcionalidades do sistema</h1>
        <h1 className={styles['h1Desktop']}>O que é Orderize?</h1>
        <p className={styles['paragrafoFeatures']}><span className={styles['colorEmphasis']}>Orderize</span> transforma o atendimento das pizzarias, tornando-o mais <span className={styles['colorEmphasis']}>eficiente</span>, <span className={styles['colorEmphasis']}>direto</span> e <span className={styles['colorEmphasis']}>claro</span>. Isso garante uma jornada perfeita do início do pedido até a entrega, fortalecendo a satisfação e a lealdade dos clientes.</p>

        <div className={styles["featuresGestao"]}>
        <Funcionalidade
          icon={imgGestao}
          iconDesktop={imagem1}
          title="Gestão de Pedidos"
          texto="Nosso sistema unifica pedidos recebidos por telefone, aplicativo ou presencialmente em uma única plataforma, permitindo acompanhar todas as etapas, da preparação à entrega, com precisão e agilidade."
          inverterOrdemDesktop={false}
        />
        </div>

        <div className={styles["featuresAnalise"]}>
          <Funcionalidade
            icon={imgAnalise}
            iconDesktop={imagem2}
            title="Análise de Dados"
            texto="Você tem acesso a análises detalhadas e estatísticas abrangentes, desde pedidos populares até controle de estoque, fornecendo uma visão completa da sua pizzaria e ajudando a otimizar processos e tomar decisões estratégicas."
            fact1="Fato 1 - 88,9% dos sistemas de pizzarias não possuem informações detalhadas sobre as pizzas mais pedidas!"
            fact2="Fato 2 - Mais da metade dos pizzaiolos enfrentam dificuldades em gerenciar adequadamente seus recursos!"
            inverterOrdemDesktop={true}
          />
        </div>

        <div className={styles["featuresSistDed"]}>
          <Funcionalidade
            icon={<IoIosTabletPortrait className={styles["icon-sistDed"]} />}
            iconDesktop={imagem3}
            title="Sistemas Dedicados"
            texto="O sistema Orderize facilita a gestão de mesas e pedidos pelos garçons, enquanto o pizzaiolo monitora atrasos para garantir agilidade. Isso assegura um atendimento eficiente e rápido, melhorando a satisfação dos clientes. O sistema também permite ajustes rápidos na cozinha para evitar congestionamentos."
            inverterOrdemDesktop={false}
          />
        </div>

      </div>

    <div id="benefits" className={styles['benefits']}>
        <h1 className={styles['h1DesktopBenfits']}>Principais Benefícios</h1>

        <div className={styles['benefitsDesktop']}>
          <Beneficio
            icon={imgAtendente} alt="atendente e um relógio"
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
      </div>


      <div id="contact" className={styles['form']}>
        <div className={styles['mobile']}>
          <h1>Conheça a Orderize!</h1>
          <p><span className={styles['spanForm']}>
            Sempre prontos para ouvir você!</span>Entre em contato conosco.</p>
        </div>

        <div className={styles['desktop']}>
          <h1 className={styles['h1DesktopForm']}>Para conhecer mais sobre a Orderize!</h1>
          <p className={styles['paragrafoForm']}>Sempre prontos para ouvir você! Tire suas dúvidas, envie feedbacks ou venha fazer parte da nossa família de clientes e tenha acesso a soluções exclusivas para sua pizzaria.</p>
        </div>

        <div className={styles['formImage']}>
          <div className={styles['imageContainer']}>
            <img src={imgForm} alt="email e tabua de pizza" />
          </div>

          <Formulario></Formulario>
        </div>
      </div>

      <FooterHome icon={logo} />
    </body>

  );
};

export default Home;
