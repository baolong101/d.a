import React, { useEffect, useState } from 'react'
import { instance } from 'src/apis'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const Product = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const loadData = async () => {
    try {
      const res = await instance.get('/Product')
      if (res.status === 200) {
        setProducts(res.data.data.$values || [])
        setError(null)
      } else {
        setError(`Error: ${res.data.message}`)
      }
    } catch (error) {
      console.log('Error fetching data: ', error)
      setError(`Hệ thống đang gặp lỗi: ${error}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadData()
    }
    fetchData()
  }, [])

  
  const handleReload = async () => {
    await loadData()
  }
  const handleBack = () => {
    // navigate('/')
  }
  //  delete
  const handleDelete = async (productID) => {
    const confirm = window.confirm('Are you sure you want to')
    if (confirm) {
      await instance.delete(`/Product/delete/${productID}`)
      setProducts(products.filter((item) => item.productID !== productID))
      alert('Delete successful')
    } else {
      alert('delete failed')
    }
  }
  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <CButton onClick={handleReload}>Reload Page</CButton>
          <CButton onClick={handleBack}>Go back </CButton>
        </div>
      )}
      {!error && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell colSpan={9} scope="col">
                <Link to={'/theme/product/add'}>
                  <CButton color="danger">Add</CButton>
                </Link>
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Product Name</CTableHeaderCell>
              <CTableHeaderCell>image</CTableHeaderCell>
              <CTableHeaderCell>Categories Name</CTableHeaderCell>
              <CTableHeaderCell>Unit</CTableHeaderCell>
              <CTableHeaderCell>Cost Prite</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {products.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.productName}</CTableDataCell>
                <CTableDataCell>
                  {item.image && (
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt={item.categoryName}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>{item.categoriesName}</CTableDataCell>
                <CTableDataCell>{item.unit}</CTableDataCell>
                <CTableDataCell>{item.costPrite}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>{item.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDelete(item.productID)}>
                    Delete
                  </CButton>
                  <Link to={`/theme/product/update/${item.productID}`}>Edit</Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </>
  )
}

export default Product
