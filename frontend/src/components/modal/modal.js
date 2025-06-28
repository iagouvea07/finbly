'use client'

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.css';

function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState({email: ''});
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmail((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      };
    
      const handleSubmit = async () => {
        if (!email.email) {
          toast.error('Please fill in the field.');
          return;
        }
    
        try {
          const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/password-recovery`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
          });
    
          if (response.status == 200) {
            console.log(response.status)
            toast.success('Message sent successfully!');
            setEmail({ email: ''});
            handleCloseModal();
          } else {
            toast.error('Failed to send message. Please try again.');
            console.log(response.status)
          }
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
            <a href="#" onClick={handleOpenModal}>Forgot password?</a>

            {isModalOpen && (
                <>
                <div className="overlay" onClick={handleCloseModal}></div>
                <div className="modal">
                    <button className="close-button" onClick={handleCloseModal}>
                    &times;
                    </button>
                    <h2 className='modal-h2'>Please fill in your e-mail</h2>
                    <input  
                      type='email'
                      name="email"
                      value={email.email}
                      onChange={handleInputChange}
                      placeholder="Email">
                    </input>
                    <button type='button' value='Submit' className='submit' onClick={handleSubmit}>Send e-mail</button>
                </div>
                </>
            )}
        </main>
    )
}

export default Modal;