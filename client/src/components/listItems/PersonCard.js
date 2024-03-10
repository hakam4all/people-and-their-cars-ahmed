import { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import { EditOutlined } from '@ant-design/icons'
import { GET_PERSON_CARS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import CarCard from './CarCard'

const PersonCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { personId: id },
  });
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;
  const getCar = data && data.personCars;


  return (
    <div>
      {editMode ?
        (
          <UpdatePerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleButtonClick}
          />
        ) : (
          <Card
            className="person-card"
            headStyle={{ backgroundColor: 'rgb(110, 110, 238)' }}
            style={styles.personCard}
            title={`${firstName} ${lastName}`}
            actions={[
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemovePerson id={id} />
            ]}
          >
            {getCar && getCar.length > 0 ? (
              getCar.map(car => (
                <CarCard key={car.id} {...car} />
              ))
            ) : (
              <p>No cars for this person.</p>
            )}
          </Card>
        )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%',
  },
  personCard: {
    marginBottom: '20px',
  },
  cardButton: {
    backgroundColor: 'rgb(110, 110, 238)',
  },
})

export default PersonCard
