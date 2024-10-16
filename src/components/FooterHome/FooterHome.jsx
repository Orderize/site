import React from "react"
import style from "./FooterHome.module.css"
import iconInsta from "../../utils/assets/iconInstagram.png"
import iconLinkedin from "../../utils/assets/iconLinkedin.png"
import iconTwitter from "../../utils/assets/iconTwitter.png"
import imgVectorFooter from "../../utils/assets/VectorFooter.png"

import MediaQuery from "react-responsive"

function FooterHome({ icon, }) {
    const listMenu = [
        { text: "Home", href: "#" },
        { text: "Nosso Sistema", href: "#ourSystem" },
        { text: "Benefícios", href: "#benefits" },
        { text: "Fale Conosco", href: "#contact" },

    ];
    const icons = [
        { src: iconInsta, alt: 'Icone do Instagram' },
        { src: iconLinkedin, alt: 'Icone do Linkedin' },
        { src: iconTwitter, alt: 'Icone do Twitter' }
    ];

    return (
            <footer className={style["footerhome"]}>
                <MediaQuery maxWidth={460}>
                    <div className={style["mobile"]}>
                        <div className={style["firstpart"]}>
                            <div className={style["logo"]}>
                                <img src={icon} alt='Logo da Orderize' />
                            </div>
                            <div className={style["medias-social"]}>
                                {icons.map((icon, index) => (
                                    <img key={index} src={icon.src} alt={icon.alt} />
                                ))}
                            </div>
                        </div>
                        <span className={style["gap"]}></span>
                        <div className={style["secondpart"]}>
                            <ul className={style["menu"]}>
                                {listMenu.map((item, index) => (
                                    <li key={index}><a href={item.href}>{item.text}</a></li>
                                ))}
                            </ul>
                            <div className={style["copyright"]}>
                                <p>&#169;CopyRight Orderize - 2024</p>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                
                <MediaQuery maxWidth={1024}>
                    <img className={style["vetorFooter"]} src={imgVectorFooter} alt="Vetor do footer" />
                    <div className={style["desktop"]}>
                    <div className={style["firstpart"]}>
                            <div className={style["logo"]}>
                                <img src={icon} alt='Logo da Orderize' />
                            </div>
                            <ul className={style["menu"]}>
                                {listMenu.map((item, index) => (
                                    <li key={index}><a href={item.href}>{item.text}</a></li>
                                ))}
                            </ul>
                        </div>
                        <span className={style["gap"]}></span>
                        <div className={style["secondpart"]}>
                            <div className={style["medias-social"]}>
                                {icons.map((icon, index) => (
                                    <img key={index} src={icon.src} alt={icon.alt} />
                                ))}
                            </div>
                            <div className={style["copyright"]}>
                                <p>&#169;CopyRight Orderize - 2024</p>
                            </div>
                        </div>
                    </div>
                </MediaQuery> 
            </footer>
    );
}

export default FooterHome;