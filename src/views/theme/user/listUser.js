import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { getAll, instance } from 'src/apis'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const Colors = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll()
        setUser(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete?')
      if (confirmDelete) {
        await instance.delete(`/User/delete/${userId}`)
        setUser(user.filter((item) => item.userId !== userId))
        alert('User deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  // --------------------export file excel

  const handleExport = () => {
    const formattedData = user.map((item, index) => ({
      '#': index + 1,
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      birthday: item.birthday,
      address: item.address,
    }))

    const ws = XLSX.utils.json_to_sheet(formattedData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'User')
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(dataBlob, 'users.xlsx')
  }

  // const handleImport = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const arrayBuffer = event.target.result;
  //     const data = new Uint8Array(arrayBuffer);
  //     const workbook = XLSX.read(data, { type: 'array' });

  //     if (workbook.SheetNames.length === 0) {
  //       console.error('No sheets found in workbook');
  //       return;
  //     }

  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     if (jsonData.length > 0) {
  //       // Bỏ qua dòng tiêu đề (nếu cần)
  //       jsonData.shift();
  //       setUser(jsonData);
  //     } else {
  //       console.error('No data found in worksheet');
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan={7} scope="col">
              <Link to={'/theme/colors/add'}>
                <CButton color="danger">Add</CButton>
              </Link>
              <CButton onClick={handleExport} color="danger">
                Export Excel
              </CButton>
              {/* <CButton color="danger">
          <input type="file" onChange={handleImport} />
        </CButton> */}
            </CTableHeaderCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {user.map((item, index) => (
            <CTableRow key={item.userId}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.fullName}</CTableDataCell>
              <CTableDataCell style={{ width: '150px' }}>
                <img
                  src={`data:image/png;base64,${item.avatar}`}
                  alt="Avatar"
                  style={{ width: '100px', height: '100px' }} // Add your custom styles here
                />
              </CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.phone}</CTableDataCell>
              <CTableDataCell>{item.birthday}</CTableDataCell>
              <CTableDataCell>{item.address}</CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => handleDelete(item.userId)} color="danger">
                  Delete
                </CButton>
                <Link to={`User/update/${item.userId}`}>
                  <CButton color="danger">Edit</CButton>
                </Link>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
