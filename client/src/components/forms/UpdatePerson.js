import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PERSON } from '../../graphql/queries'

const UpdatePerson = props => {
  const { id, firstName, lastName } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [UpdatePerson] = useMutation(UPDATE_PERSON)

  const onFinish = values => {
    const { firstName, lastName } = values

    UpdatePerson({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    props.onButtonClick()
  }

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Form
      name='update-person-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please enter a first name' }]}
      >
        <Input placeholder='i.e. Tom' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input placeholder='i.e. Hardly' />
      </Form.Item>
      <Button htmlType='submit'>Update</Button>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdatePerson
