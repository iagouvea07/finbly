'use client'
import React from "react";
import './menu.css';
import Cookie from 'universal-cookie'
import Image from "next/image";


const Menu = () => {

    const cookies = new Cookie()

    const clearCookie = async () => {
        const cookie = cookies.get('auth');
        const sessionInfo = { token: cookie };
    
        try {
            console.log(sessionInfo)
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionInfo),
            });
    
            if (response.ok) {
                cookies.remove('auth');
            } else {
                console.error('Erro na solicitação de logout:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na solicitação de logout:', error.message);
        }
    };
    

    return(
        <nav className="menu-lateral">
            <div className="btn-expandir">
            </div>
            <ul>
                <li className="item-menu">
                    <a href="/home">
                        <Image src="/icons/panel.svg" alt='panel' width={20} height={20} style={{ cursor:'pointer', filter: 'invert(100%)'}}/> 
                        <span className="txt-link">Dashboard</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a href="/budget">
                        <Image src="/icons/stocks.svg" alt='stocks' width={20} height={20} style={{ cursor:'pointer', filter: 'invert(100%)' }}/> 
                        <span className="txt-link">Budgets</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a href="#">
                        <Image src="/icons/user.svg" alt='user' width={20} height={20} style={{ cursor:'pointer', filter: 'invert(100%)' }}/> 
                        <span className="txt-link">User</span>
                    </a>
                </li>
                <li className="item-menu">
                    <a href="#">
                        <Image src="/icons/settings.svg" alt='settings' width={20} height={20} style={{ cursor:'pointer', filter: 'invert(100%)' }}/> 
                        <span className="txt-link">Settings</span>
                    </a>
                </li>
                <li className="item-menu last-item-menu">
                    <a href="/" onClick={clearCookie}>
                        <Image src="/icons/logout.svg" alt='logout' width={20} height={20} style={{ cursor:'pointer', filter: 'invert(100%)' }}/> 
                        <span className="txt-link">Logout</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}


export default Menu;