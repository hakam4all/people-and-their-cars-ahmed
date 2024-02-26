import { useState } from 'react'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import { EditOutlined } from '@ant-design/icons'

const PersonCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

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
            style={styles.card}
            title={`${firstName} ${lastName}`}
            actions={[
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemovePerson id={id} />
            ]}

          >

          </Card>
        )
      }
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '1000px',
  }
})

export default PersonCard
