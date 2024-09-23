import React from 'react';
import './home.css';
import Beneficio from '../../beneficios/beneficio';
import Formulario from '../../form/form';
import Funcionalidade from '../../funcionalidades/funcionalidade';
import { IoMenuOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div className='body'>
      <header>
        <div className='menu'>
          <IoMenuOutline className="menu-icon" />
          <img width="30" height="30" src="https://img.icons8.com/ios/50/accessibility2.png" alt="accessibility" className='menu-icon-acessebility' />
        </div>


        <div className="content">
          <h1>Um Sistema de Gestão Inovador!</h1>
          <p>Aumente a eficiência e ofereça um atendimento excepcional.</p>
          <p>Adquira agora e leve seu negócio ao próximo nível!</p>

          <div className='buttonImage'>
            <button className="button">Saiba mais</button>
            <img className="pizzasBanner" src="public/assets/images/imgsPizzaBanner.png" alt="Pizza" />
          </div>

        </div>
      </header>


      <div className='funcionalidades'>
        <h1>Funcionalidades do sistema</h1>
        <Funcionalidade
          icon="public/assets/images/imgsGestao.svg"
          title="Gestão de Pedidos"
        />

        <Funcionalidade
          icon="public/assets/images/imgsAnalise.svg"
          title="Análise de Dados"
        />
  
          <Funcionalidade
            icon="public/assets/images/imgSistDed.svg"
            title="Sistemas Dedicados"
            style={{ width: '30%'}}
          />

      </div>

      <div className='beneficios'>
        <h1>Principais Benefícios</h1>
        <Beneficio
          icon="public/assets/images/atendente.svg" alt="atendente e um relógio"
          title="Agilidade no Atendimento"
        />

        <Beneficio
          icon="public/assets/images/insight.svg" alt="quebra-cabeça"
          title="Infomação fluída entre as etapas"
        />

        <Beneficio
          icon="public/assets/images/quebraCabeca.svg" alt="lâmpada de idéias e gráfico"
          title="Insights valiosos"
        />

      </div>

      <div className='form'>
        <h1>Conheça a Orderize!</h1>
        <p><span className='spanForm'>
          Sempre prontos para ouvir você!</span>Entre em contato conosco.</p>
        <Formulario></Formulario>


      </div>
    </div>

  );
};

export default Home;
