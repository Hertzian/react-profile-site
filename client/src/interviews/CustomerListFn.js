import { useState } from 'react'

export default function CustomerListFn() {
  const [customers, setCustomers] = useState([])

  const createCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer])
  }

  const deleteCustomer = (delCustomer) => {
    setCustomers(
      customers.filter((customer) => {
        return delCustomer !== customer
      })
    )
  }

  const custs = customers.map((customer, idx) => {
    return (
      <Customer
        key={idx}
        customer={customer}
        id={idx}
        delCustomer={deleteCustomer}
      />
    )
  })

  return (
    <div>
      <h3>Functional component</h3>
      <CustomerForm newCustomer={createCustomer} />
      {custs.length >= 1 && <ul>{custs}</ul>}
    </div>
  )
}

function CustomerForm(props) {
  const [customer, setCustomer] = useState('')

  const handleChange = (e) => {
    setCustomer(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!customer) return
    props.newCustomer(customer)
    setCustomer('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='customer'
          placeholder='Name'
          onChange={handleChange}
          value={customer}
        />
        <button>Add Customer</button>
      </form>
    </>
  )
}

function Customer(props) {
  const deleteCustomer = () => {
    props.delCustomer(props.customer)
  }

  return <li onClick={deleteCustomer}>{props.customer}</li>
}
