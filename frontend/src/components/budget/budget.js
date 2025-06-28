'use client'

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './budget.css';
import Image from "next/image";
import Select from 'react-select';

function Budget() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [budgetValue, setBudgetValue] = useState('');
    const [budgetType, setBudgetType] = useState('');
    const [budgetPeriod, setBudgetPeriod] = useState('');

    const typeOptions = [
      {
        value: 'Alimentação',
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/food.png" width="20" height="20" style={{ marginRight: 8 }} />
            Alimentação
          </div>
        ),
      },
      {
        value: 'Lazer',
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/leisure.png" width="20" height="20" style={{ marginRight: 8 }} />
            Lazer
          </div>
        )
      },
      {
        value: 'Educação',
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/education.png" width="20" height="20" style={{ marginRight: 8 }} />
            Educação
          </div>
        )
      },
      {
        value: 'Investimentos',
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/investment.png" width="20" height="20" style={{ marginRight: 8 }} />
            Investimentos
          </div>
        )
      },
      
      { value: 'Transporte', 
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/transport.png" width="20" height="20" style={{ marginRight: 8 }} />
            Transporte
          </div>
        )
      },
      { value: 'Customizado', 
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/budget-types/miscellaneous.png" width="20" height="20" style={{ marginRight: 8 }} />
            Customizado
          </div>
        )
      },
    ];

    const periodOptions = [
      { value: "Yearly",         
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/periods/yearly.png" width="20" height="20" style={{ marginRight: 8 }} />
            Yearly
          </div>
        )},
      { value: "Monthly",         
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/periods/monthly.png" width="20" height="20" style={{ marginRight: 8 }} />
            Monthly
          </div>
        )},
      { value: "Weekly",         
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/periods/weekly.png" width="20" height="20" style={{ marginRight: 8 }} />
            Weekly
          </div>
        )},
      { value: "Daily",         
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/periods/daily.png" width="20" height="20" style={{ marginRight: 8 }} />
            Daily
          </div>
        )}
    ]
    
    const customStyles = {
      control: (base) => ({
        ...base,
        minHeight: '32px',
        height: '2.4rem',
        fontSize: '14px',
        width: '115%',
        left: '-10%',
        border: '1px solid #ccc',
        '&:hover': {
        border: '1px solid #ccc',
        }
      }),
      menu: (base) => ({
        ...base,
        width: '115%',
        left: '-10%' 
      }),

      container: (base) => ({
        ...base,
        width: '200px',
      }),
    };
      const handleSubmit = async () => {
        if (!budgetValue) {
          toast.error('Please fill in the field.');
          return;
        }
    
        try {    
            console.log(budgetValue, budgetType, budgetPeriod);
            toast.success('Budget created successfully!');
            setBudgetValue({ budgetValue: ''});
            setBudgetType({ budgetType: ''});
            setBudgetPeriod({ budgetPeriod: ''});
            handleCloseModal();
        } catch (error) {
          console.error('Error sending message:', error);
          toast.error('An error occurred. Please try again later.');
        }
      };
    
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    return (
        <main>
            <ToastContainer />
            <a href="#" className='create-budget' onClick={handleOpenModal}>New Budget</a>

            {isModalOpen && (
                <>
                <div className="overlay" onClick={handleCloseModal}></div>
                <div className="budget">
                    <button className="close-button" onClick={handleCloseModal}>
                    &times;
                    </button>
                    <h2 className='modal-h2'>Create your budget</h2>
                    <input  
                      type='number'
                      name="Budget Value"
                      value={budgetValue}
                      onChange={(e) => setBudgetValue(e.target.value)}>
                    </input>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
                      <Select
                        options={typeOptions}
                        onChange={(selected) => setBudgetType(selected.value)}
                        styles={customStyles}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%'  }}>
                      <Select
                        options={periodOptions}
                        onChange={(selected) => setBudgetPeriod(selected.value)}
                        styles={customStyles}
                      />
                    </div>
                    <button type='button' value='Submit' className='submit' onClick={handleSubmit}>Create</button>
                </div>
                </>
            )}
        </main>
    )
}

export default Budget;