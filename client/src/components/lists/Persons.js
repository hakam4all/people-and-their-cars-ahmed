import { useQuery } from '@apollo/client'
import { GET_PERSONS, GET_CARS } from '../../graphql/queries'
import { List, Card } from 'antd'
import CarCard from '../listItems/CarCard'

const Persons = () => {
  const styles = getStyles()

  const { loading: loadingPersons, error: errorPersons, data: dataPersons } = useQuery(GET_PERSONS)
  const { loading: loadingCars, error: errorCars, data: dataCars } = useQuery(GET_CARS)
  console.log('cars data is: ', dataCars)
  console.log('persons data is: ', dataPersons)
  if (loadingPersons) return 'Loading...'
  if (errorPersons) return `Error! ${errorPersons.message}`
  if (loadingCars) return 'Loading...'
  if (errorCars) return `Error! ${errorCars.message}`

  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Records</h2>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {dataPersons?.persons.map(({ id, firstName, lastName }) => {
          const personCars = dataCars?.cars?.filter(car => car.personId === id) ?? [];
          return (
            <List.Item key={id}>
              <Card title={`${firstName} ${lastName}`}
                headStyle={{ backgroundColor: 'blue' }} 
                style={styles.personCard}>

                {personCars.length > 0 ? (
                  personCars.map(car => (
                    <CarCard key={car.id} {...car} />
                  ))
                ) : (
                  <p>No cars for this person.</p>
                )}
              </Card>
            </List.Item>
          );
        })}
      </List>
    </>
  )
}


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '1000px',
    // maxwidth: '1000px',
    margin: '0 auto',

  },
  personCard: {
    marginBottom: '20px',
  },
})
export default Persons
