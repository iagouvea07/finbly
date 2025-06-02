'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import '../globals.css'
import './layout.css'



const Register = () => {
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const handleRegister = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, user, email })
    })

    switch (response.status) {
      case 200:
        router.push('/')
        setTimeout(() => {
          toast.success('E-mail enviado para confirmação')
        }, 0)
        break
      case 401:
        toast.error('Usuário ou e-mail já utilizado')
        break
      case 400:
        toast.error('Campos com valores inválidos')
        break
      default:
        toast.error('Erro desconhecido')
        break
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="form">
        <h1 className="title_register">Registre sua conta</h1>
        <Input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <Input type="text" placeholder="Usuário" onChange={(e) => setUser(e.target.value)} />
        <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="button"
          value="Registrar"
          className="submit_register"
          onClick={handleRegister}
        />
      </div>
    </>
  )
}

export default Register
