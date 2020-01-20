import React from 'react'
import styled from 'styled-components'
import Ls from './Ls'

const COMMANDS = ['help', 'ls', 'clear', 'cwd']

const Command = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > span {
    font-size: 24px;
  }
`

const NotFound = ({ value }) => <span>{`command not found: ${value}`}</span>

const Help = () => (
  <span>{`available commands are: ${COMMANDS.join(', ')}`}</span>
)

const CurrentDirectory = () => <span>{window.location.pathname}</span>

export default ({ value }) => {
  const components = []

  switch (value) {
    case 'ls':
      components.push(<Ls key={`Ls_${value}`} />)
      break
    case 'help':
      components.push(<Help key={`Help_${value}`} />)
      break
    case 'cwd':
      components.push(<CurrentDirectory key={`CurrentDirectory_${value}`} />)
      break
    default:
      components.push(<NotFound value={value} key={`NotFound_${value}`} />)
      break
  }

  return (
    <Command>
      <span>{` ~ ${value}`}</span>
      {components}
    </Command>
  )
}
