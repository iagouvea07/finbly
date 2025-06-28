"use client"

import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import '../globals.css'
import './layout.css'
import Menu from '../../components/menu/menu.js';

const performanceData = [
  { name: 'Dia 1', value: 200 },
  { name: 'Dia 2', value: 300 },
  { name: 'Dia 3', value: 250 },
  { name: 'Dia 4', value: 400 },
  { name: 'Dia 5', value: 320 },
  { name: 'Dia 6', value: 450 },
  { name: 'Dia 7', value: 500 },
];

const portfolioData = [
  { name: 'Ações', value: 50 },
  { name: 'Renda Fixa', value: 30 },
  { name: 'Fundos', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Home = () => {
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
          <div className="card">
            <p className="card-label">Lucro/Prejuízo</p>
            <p className="card-value positive">+R$ 2.150,00 <span>+5%</span></p>
          </div>
        </section>

        <section className="dashboard-charts">
          <div className="chart">
            <h2>Desempenho dos Ativos</h2>
            <ResponsiveContainer width="95%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart">
            <h2>Carteira Diversificada</h2>
            <ResponsiveContainer width="100%" height={215}>
              <PieChart>
                <Pie data={portfolioData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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