import React, { useState } from 'react'
import { useInput } from './hooks/input'
import AnimatedText from './components/AnimatedText'
import styled from 'styled-components'
import Command from './components/Command'

const NAME = ''

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
  const [commands, setCommands] = useState([])
  const { value, bind, reset } = useInput('')

  const onSubmit = e => {
    if (value == 'clear') {
      setCommands([])
    } else {
      setCommands([...commands, value])
    }
    reset()
    e.preventDefault()
  }

  return (
    <App>
      <TextLines>
        {commands.map((command, i) => (
          <Command value={command} key={`Command_${i}`} />
        ))}
      </TextLines>
      <TextLine>
        <AnimatedText name={NAME} />
        <form onSubmit={onSubmit}>
          <Input autoFocus={true} {...bind} />
        </form>
      </TextLine>
    </App>
  )
}
