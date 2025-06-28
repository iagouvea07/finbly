"use client"

import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css'
import './layout.css'
import Menu from '../../components/menu/menu.js';
import Budget from '../../components/budget/budget.js';

const Home = () => {

  async function getBudgets() {
    
  }


  return (
    <>
      <ToastContainer />
      <Menu />
      <main className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <section className="dashboard-cards">
          <div className="card">
            <p className="card-label">Saldo Total</p>
            <p className="card-value">R$ 45.000,00</p>
          </div>
          <div className="card">
            <p className="card-label">Investimentos Ativos</p>
            <p className="card-value">12 Ativos</p>
          </div>
            <Budget/>
        </section>
        <section className="dashboard-charts">
          <div className="chart">
            <h2>Tipos de Orçamentos</h2>
            <div className="budget-list">
              <div className="budget-container">
                <p className='budget-name'>Lazer</p><p className='budget-value'>R$150,00</p>
              </div>
              <div className="budget-container">
                <p className='budget-name'>Gastos Essenciais</p><p className='budget-value'>R$1200,00</p>
              </div>
              <div className="budget-container">
                <p className='budget-name'>Investimentos</p><p className='budget-value'>R$2000,00</p>
              </div>
              <div className="budget-container">
                <p className='budget-name'>Alimentação</p><p className='budget-value'>R$1400,00</p>
              </div>
            </div>
          </div>
          <div className="chart">
            <h2>Histórico de lançamentos</h2>
            <div className="budget-list">
            </div>
          </div>
        </section>

        <section className="dashboard-lists">
          <div className="list-block">
            <h2>Últimas Movimentações</h2>
            <ul>
              <li>Comprou 5x AAPL - R$ 1.500,00 <span>ontem</span></li>
              <li>Vendeu 2x ITUB4 - R$ 800,00 <span>há 2 dias</span></li>
            </ul>
          </div>
          <div className="list-block">
            <h2>Alertas & Recomendações</h2>
            <ul>
              <li>Ação PETR4 caiu 3%, avaliar posição.</li>
              <li>Fundo CDI+ está vencendo em 3 dias.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;