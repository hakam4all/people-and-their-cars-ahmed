import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS } from '../../graphql/queries'

const AddPerson = () => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const { data: personsData } = useQuery(GET_PERSONS)
  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      const data = cache.readQuery({ query: GET_PERSONS })
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          ...data,
          persons: [...data.persons, addPerson]
        },
      })
    }
  })

  useEffect(() => {
    forceUpdate({})
  }, [])

  const findAvailableId = (persons) => {
    const existingIds = persons.map(person => Number(person.id))
    for (let id = 1; id <= 100; id++) {
      if (!existingIds.includes(id)) {
        return id
      }
    }
    throw new Error('No available ID found')
  }

  const onFinish = values => {
    const { firstName, lastName } = values
    const id = findAvailableId(personsData.persons)

    addPerson({
      variables: {
        id: String(id), 
        firstName,
        lastName
      }
    })
  }


  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Add Person</h2>
      <Form
        name='add-person-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px' }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='firstName'
          label="First Name"
          style={{ marginLeft: '20px' }}
          rules={[{ required: true, message: 'Please enter a first name' }]}
        >
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item
          name='lastName'
          label="Last Name"
          style={{ marginLeft: '20px' }}
          rules={[{ required: true, message: 'Please enter a last name' }]}>
          <Input placeholder='Last Name' />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddPerson
