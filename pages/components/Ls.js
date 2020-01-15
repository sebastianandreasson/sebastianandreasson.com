import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const PROJECTS = gql`
  {
    allProjects {
      id
      name
      url
      content
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(PROJECTS)

  if (loading || error) return <></>

  const names = data.allProjects.map(({ name }) => name)

  return <span>{names.join(' ')}</span>
}
