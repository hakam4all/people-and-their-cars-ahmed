import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title' //done
import AddPerson from './components/forms/AddPerson'   //AddContact : AddPerson
import Persons from './components/lists/Persons'  //Contacts : Persons
import AddCar from './components/forms/AddCar'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title /> 
        <AddPerson />
        < AddCar />
        <Persons />
      </div>
    </ApolloProvider>
  )
}

export default App
