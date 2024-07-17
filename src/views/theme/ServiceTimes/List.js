import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { instance } from 'src/apis'

const List = () => {
  const [service, setService] = useState([])
  const [error, setError] = useState(null)

  const loadData = async () => {
    try {
      const res = await instance.get('/ServiceTime')
      if (res.status === 200) {
        setService(res.data.data.$values || [])
        setError(null)
      } else {
        setError(`Error: ${res.data.message}`)
      }
    } catch (error) {
      setError(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleReload = () => {
    loadData()
  }

  const handleDelete = async (serviceID) => {
    try {
      if(window.confirm('Are you sure you want to delete')){
        await instance.delete(`/ServiceTime/delete/${serviceID}`)
        setService(service.filter((item) => item.serviceID!== serviceID))
        alert('Service deleted successfully')
      }
    } catch (error) {
      setError(`Error deleting service: ${error.message}`)
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <CButton onClick={handleReload}>Reload Page</CButton>
        </div>
      )}
      {!error && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell colSpan={6} scope="col">
                <Link to={'/theme/service/add'}>
                  <CButton color="danger">Add</CButton>
                </Link>
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">serviceName</CTableHeaderCell>
              <CTableHeaderCell scope="col">unit</CTableHeaderCell>
              <CTableHeaderCell scope="col">categoriesName</CTableHeaderCell>
              <CTableHeaderCell scope="col">openPrice</CTableHeaderCell>
              <CTableHeaderCell scope="col">price</CTableHeaderCell>
              <CTableHeaderCell scope="col">image</CTableHeaderCell>
              <CTableHeaderCell scope="col">action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {service.map((item, index) => (
              <CTableRow key={item.serviceID}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.serviceName}</CTableDataCell>
                <CTableDataCell>{item.unit}</CTableDataCell>
                <CTableDataCell>{item.categoriesName}</CTableDataCell>
                <CTableDataCell>{item.openPrice}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
                <CTableDataCell>
                  {item.image && (
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt={item.categoryName}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDelete(item.serviceID)}>
                    Delete
                  </CButton>
                  <Link to={`update/${item.serviceID}`}>
                    <CButton color="warning">Edit</CButton>
                  </Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </div>
  )
}

export default List
