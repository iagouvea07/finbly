'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import './layout.css'
import Logo from '../../public/images/finbly.png'
import Image from 'next/image'
import Modal from '../components/modal/modal.js'

export default function HomeClient() {
  const searchParams = useSearchParams()
  const mailRegister = searchParams.get('sended-mail-registration')
  const passwordUpdated = searchParams.get('password-updated')
  const router = useRouter()

  useEffect(() => {
    if (mailRegister === '1') {
      toast.success('E-mail sended to confirmation')
    }
    else if (passwordUpdated === '1') {
      toast.success('Password updated successfully')
    }
  }, [mailRegister])

  const handleLogin = () => {
    router.push('/home')
  }

  return (
    <>
      <ToastContainer />
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
              <a href="#"><Modal/></a>
            </div>

            <button type="button" className='submit' onClick={handleLogin}>Log in</button>
          </form>
          <p className="signup">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
          
        </div>
      </div>
    </>
  )
}
