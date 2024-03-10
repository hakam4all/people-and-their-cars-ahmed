import { useQuery } from '@apollo/client'
import { GET_PERSONS, GET_CARS } from '../../graphql/queries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'

const Persons = () => {
  const styles = getStyles()

  const { loading: loadingPersons, error: errorPersons, data: dataPersons } = useQuery(GET_PERSONS)
  console.log('persons data is: ', dataPersons)
  if (loadingPersons) return 'Loading...'
  if (errorPersons) return `Error! ${errorPersons.message}`

  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Records</h2>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {dataPersons?.getPerson.map(({ id, firstName, lastName }) => (
          <List.Item key={id} >
            <PersonCard  id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>

    </>
  )
}


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '1000px',
    margin: '0 auto',

  },
  personCard: {
    marginBottom: '20px',
  },
})
export default Persons
