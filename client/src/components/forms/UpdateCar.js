
import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_CAR } from '../../graphql/queries'

const UpdateCar = props => {
  const { id, year, make, model, price } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [UpdateCar] = useMutation(UPDATE_CAR)

  const onFinish = values => {
    const { year, make, model, price } = values

    UpdateCar({
      variables: {
        id,
        year,
        make,
        model, 
        price
      }
    })
    props.onButtonClick()
  }

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Form
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price
      }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please enter a year' }]}
        
      >
        <Input placeholder='i.e. 2019' />
      </Form.Item>
      <Form.Item name='make' rules={[{ required: true, message: 'Please enter a make' }]}>
        <Input placeholder='i.e. Toyota' />
      </Form.Item>
      <Form.Item name='model' rules={[{ required: true, message: 'Please enter a model' }]}>
        <Input placeholder='i.e. Corolla' />
      </Form.Item>
      <Form.Item name='price' rules={[{ required: true, message: 'Please enter a price' }]}>
        <Input placeholder='i.e. 25,200' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            form={form}
            type='primary'
            htmlType='submit'
            onClick={console.log('updateCar button is clicked2')}
            

          // disabled={
          //   (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
          //   form.getFieldsError().filter(({ errors }) => errors.length).length
          // }
          >
            Update car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
