'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import './layout.css'
import Logo from '../../public/images/finbly.png'
import Image from 'next/image'

export default function HomeClient() {
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
      <div className="login-container">
        <div className="login-box">
          <Image src={Logo} alt="Finbly Logo" width={150} height={150} />
          <h2>Log in to your account</h2>
          <form>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="you@example.com" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />

            <div className="links">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Log in</button>
          </form>
          <p className="signup">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </>
  )
}
