
import { Button, Form, Input, Select, notification } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CARS, GET_PERSONS } from '../../graphql/queries';

const { Option } = Select;

const AddCar = () => {
  const [form] = Form.useForm();
  const { loading: loadingPersons, error: errorPersons, data: dataPersons } = useQuery(GET_PERSONS);
  const { loading: loadingCars, error: errorCars, data: dataCars } = useQuery(GET_CARS);

  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: [...cars, addCar],
        },
      });
    },
  });

  const findAvailableId = (cars) => {
    const existingIds = new Set(cars.map(car => Number(car.id)));
    for (let id = 1; id <= 100; id++) {
      if (!existingIds.has(id)) {
        return id;
      }
    }
    throw new Error('No available ID found');
  };

  const onFinish = async (values) => {
    try {
      const { year, make, model, price, personId } = values;
      const id = findAvailableId(dataCars.cars);

      await addCar({
        variables: {
          id: String(id),
          year: parseInt(year, 10),
          make,
          model,
          price: parseFloat(price),
          personId,
        },
      });

      notification.success({
        message: 'Car Added',
        description: 'The car has been added successfully.',
      });

      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error adding the car.',
      });
      console.error('Error adding a car:', error);
    }
  };

  if (loadingPersons || loadingCars) return 'Loading...';
  if (errorPersons || errorCars) {
    notification.error({
      message: 'Error Loading Data',
      description: 'There was an error loading the data.',
    });
    console.error('Error loading data:', errorPersons || errorCars);
    return;
  }



  return (
    <>
      <h2 style={{ marginBottom: '40px' }}>Add Car</h2>
      <Form
        name='add-car-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='year'
          label="Year"
          style={{ marginLeft: '10px', width: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
          rules={[{ required: true, message: 'Please enter a manufacture year' }]}
        >
          <Input placeholder='Year' style={{ marginLeft: '10px', width: '100px' }} />
        </Form.Item>

        <Form.Item
          name='make'
          label="Make"
          style={{ marginLeft: '10px', width: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
          rules={[{ required: true, message: 'Please enter a car make' }]}>
          <Input placeholder='Make' style={{ marginLeft: '10px', width: '100px' }} />
        </Form.Item>

        <Form.Item
          name='model'
          label="Model"
          style={{ marginLeft: '10px', width: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
          rules={[{ required: true, message: 'Please enter a car model' }]}>
          <Input placeholder='Model' style={{ marginLeft: '10px', width: '100px' }} />
        </Form.Item>

        <Form.Item
          name='price'
          label="Price"
          style={{ marginLeft: '10px', marginRight: '10px', width: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
          rules={[{ required: true, message: 'Please enter the price' }]}>
          <Input placeholder='$' style={{ marginLeft: '10px', width: '100px' }} />
        </Form.Item>


        <Form.Item
          name='personId'
          label="Person"
          style={{ marginLeft: '10px', width: '200px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
          rules={[{ required: true, message: 'Please select a person' }]}
        >
          <Select placeholder='Select a person' style={{ marginLeft: '10px' , width: '100px' }}>
            {dataPersons?.persons?.map(({ id, firstName, lastName }) => (
              <Option key={id} value={id}>{`${firstName} ${lastName}`}</Option>
            ))}
          </Select>
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
              onClick={console.log('the button message', addCar)}
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCar
