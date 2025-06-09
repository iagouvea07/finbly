'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Input from '@/components/input/input';
import './layout.css';
import Logo from '../../public/images/finbly.png';
import Image from 'next/image';

export default function Home() {
  const searchParams = useSearchParams()
  const mailRegister = searchParams.get('sended-mail-registration')

  useEffect(() => {
    if (mailRegister === '1') {
      toast.success('E-mail enviado para confirmação')
    }
  }, [mailRegister])

  return (
    <>
    <ToastContainer theme="dark" /> 
    <div class="login-container">
      <div class="login-box">
        <Image src={Logo} alt="Finbly Logo" width={150} height={150} />
        <h2>Log in to your account</h2>
        <form>
          <label for="email">Email address</label>
          <input type="email" id="email" placeholder="you@example.com" required />

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <div class="links">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log in</button>
        </form>
        <p class="signup">Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
    </>
  );
}
