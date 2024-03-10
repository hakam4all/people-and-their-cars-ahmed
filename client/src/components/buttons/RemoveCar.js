import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { REMOVE_CAR, GET_PERSON_CARS } from '../../graphql/queries' 


const RemoveCar = ({ id }) => {
 

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
        try {
          const existingData = cache.readQuery({ query: GET_PERSON_CARS, variables: { personId: removeCar.personId } });
          if (!existingData) return;
      
          const updatedCars = existingData.personCars.filter(getCar => getCar.id !== removeCar.id);
          cache.writeQuery({
            query: GET_PERSON_CARS,
            variables: { personId: removeCar.personId },
            data: { personCars: updatedCars }, 
          });
        } catch (error) {
          console.error('Error updating cache:', error);
        }
      },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveCar
