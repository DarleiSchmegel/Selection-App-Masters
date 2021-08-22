import { CardsStyles } from "../styles/Components/Cards"
import React from 'react';
import Link from 'next/link'
//import {menuOnOff} from '../../scripts'
//import './styles.css'
import logo from '../../images/Logo1.png'


const Header = () => {
 

  return(
    <h1>Header</h1>

    // <header id="cabecalho">
        
    //     <div className="container">
    //       <Link className="pageSelect1" id="top" to="/" >
    //         <img className="logo-nav" id="logo-nave" src={logo} alt=""/>
    //       </Link>
      
        
          
    //       <div className="menu-section">
    //         <div className="menu-toggle" onClick={menuOnOff} >
    //           <div className="one"></div>
    //           <div className="two"></div>
    //           <div className="three"></div>
    //         </div>
    //         <nav className="nav_tabs">
    //           <ul>
    //             {/* <li>
    //               <Link className="pageSelect1" to="/" onClick={menuOnOff}>Inicio</Link>
    //             </li> */}
    //             <li>   
    //                 <Link  to="/ensino-basico" onClick={menuOnOff}>Nível Fundamental</Link> 
    //             </li>
    //             <li>             
    //               <Link to="/ensino-medio" onClick={menuOnOff} >Nível Médio</Link>
    //             </li>
    //             <li>                   
    //               <Link to="ensino-superior"onClick={menuOnOff} >Nível superior</Link>
    //             </li>
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    // </header>
  
  )

}
export default Header;
