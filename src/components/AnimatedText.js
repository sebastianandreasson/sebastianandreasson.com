import React, { useState } from 'react'
import { useSpring } from 'react-spring'
import styled from 'styled-components'

const Name = styled.h1``

const lengthToName = (name, length) =>
  name
    .split('')
    .filter((_, i) => length > i)
    .join('')

export default props => {
  const [name, setName] = useState('')
  const inited = name === props.name
  useSpring({
    number: props.name.length,
    from: { number: 0 },
    config: {
      delay: 0,
      duration: 750,
      friction: 50,
      mass: 1,
      tension: 250,
    },
    onFrame({ number }) {
      if (number % 1) setName(lengthToName(props.name, number))
    },
  })

  return (
    <Name>
      {`> ${name}`} {inited && ' ~ '} {/* {ticker && <Pointer />} */}
    </Name>
  )
}
