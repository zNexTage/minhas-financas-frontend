import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input'
import FormMoneyOutflow from './components/forms/form-money-outflow'
import { Container } from 'react-bootstrap'
import RegisterMoneyOutflow from './pages/money-outflow/register-money-outflow'

function App() {

  return (
    <Container>
      <RegisterMoneyOutflow />
    </Container>
  )
}

export default App
