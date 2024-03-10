import { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'
import { EditOutlined } from '@ant-design/icons'


const CarCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, year, make, model, price } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          className="car-card"
          style={styles.card}
          headStyle={{ backgroundColor: 'lightblue' }}
          title={`${year} ${make} ${model} -> $ ${price}`}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        >
        </Card>
      )}
    </div>
  )
}



const getStyles = () => ({
  card: {
    width: '1000px',
    marginBottom: '20px',
  }
})

export default CarCard
