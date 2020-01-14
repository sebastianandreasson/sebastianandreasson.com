import React, { useState } from 'react'
import { useInput } from './hooks/input'
import AnimatedText from './components/AnimatedText'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const NAME = 'Sebastian Andreasson'
const COMMANDS = ['help', 'ls', 'clear', 'cwd']

const App = styled.div`
  width: 100%;
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;

  font-family: 'Monaco', cursive;
  font-size: 20px;
`

const TextLines = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > h1 {
    margin: 0;
  }
`

const TextLine = styled.div`
  width: 100%;
  height: 100px;
  align-items: center;
  display: flex;
`

const Input = styled.input`
  border: none;
  padding: 20px 20px;
  background-color: black;
  height: 50px;
  font-family: 'Monaco', cursive;
  font-size: 40px;
  outline: none;
  color: lime;
  font-weight: bold;
`

export default () => {
  const [inputs, setInputs] = useState([])
  const { value, bind, reset } = useInput('', COMMANDS)

  const onSubmit = e => {
    setInputs([...inputs, ` ~ ${value}`])
    reset()
    e.preventDefault()
    if (value.length && COMMANDS.indexOf(value) === -1) {
      return setInputs([
        ...inputs,
        ` ~ ${value}`,
        `command not found: ${value}`,
      ])
    }

    switch (value) {
      case 'clear':
        setInputs([])
        break
      case 'help':
        setInputs([...inputs, `available commands are: ${COMMANDS.join(', ')}`])
        break
      case 'cwd':
        setInputs([...inputs, `${window.location.pathname}`])
      default:
        break
    }
  }

  return (
    <App>
      <TextLines>
        {inputs.map(input => (
          <h1>{input}</h1>
        ))}
      </TextLines>
      <TextLine>
        <AnimatedText name={NAME} />
        <form onSubmit={onSubmit}>
          <Input autofocus={true} {...bind} />
        </form>
      </TextLine>
    </App>
  )
}
