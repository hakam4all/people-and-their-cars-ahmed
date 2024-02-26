import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PERSONS, REMOVE_PERSON } from '../../graphql/queries' 
import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS })
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: filter(persons, c => {
            return c.id !== removePerson.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemovePerson
