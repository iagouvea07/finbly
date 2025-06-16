'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '@/components/input/input';

import '../globals.css'
import './layout.css'


const Register = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const handleRegister = async () => {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username,
        name, 
        last_name,
        email 
      })
    })

    switch (response.status) {
      case 200:
        router.push('/?sended-mail-registration=1')
        break
      case 401:
        toast.error("Information is missing or invalid")
        break
      case 400:
        toast.error("User already exists")
        break
      default:
        toast.error('Unknown Error')
        break
    }
  }
  return (
    <>
      <ToastContainer /> 
      <div className="register-container">
        <div className="register-box">
        <h2> Sign in your account</h2>
        <form>
          <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <Input type="text" placeholder="User" onChange={(e) => setUsername(e.target.value)} />
          <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="button"
            value="Register"
            className="submit_register"
            onClick={handleRegister}
          />
        </form>
        </div>
      </div>
    </>
  )
}

export default Register
