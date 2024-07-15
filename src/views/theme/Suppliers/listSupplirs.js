import React, { useEffect, useState } from 'react'
import { instance } from 'src/apis'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'

const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const loadData = async () => {
    try {
      const response = await instance.get('/Supplier')
      if (response.status === 200) {
        setSuppliers(response.data.data.$values || [])
        setError(null)
      } else {
        setError(`Error: ${response.data.message}`)
      }
    } catch (error) {
      console.log('Error fetching data: ', error)
      setError(`Hệ thống đang gặp lỗi: ${error.message}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadData()
    }
    fetchData()
  }, [])
  // Delet----------------------------------------------------------------
  const handleDelete = async(supplierID) => {

   if(window.confirm('Are you sure you want to delete')){
    await instance.delete(`Supplier/Delete/${supplierID}`)
    setSuppliers(suppliers.filter((item)=> item.supplierID !== supplierID))
    alert('delete supplier successfully')
   }
  }
  const handleReload = () => {
    loadData()
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <CButton onClick={handleReload}>Reload Page</CButton>
          <CButton onClick={handleBack}>Go back</CButton>
        </div>
      )}
      {!error && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell colSpan={6} scope="col">
                <Link to={'/theme/supplire/add'}>
                  <CButton color="danger">Add</CButton>
                </Link>
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Supplier Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {suppliers.map((item, index) => (
              <CTableRow key={item.supplierID}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.supplierName}</CTableDataCell>
                <CTableDataCell>{item.phone}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={()=>handleDelete(item.supplierID)}>
                    Delete
                  </CButton>
                  <Link to={`update/${item.supplierID}`}>
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

export default ListSuppliers
