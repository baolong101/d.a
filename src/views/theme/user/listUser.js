import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import { getAll, instance } from 'src/apis';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Colors = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const res = await getAll(); // Sử dụng getAll từ apis
      if (res && res.statusCode === 200) {
        setUser(res.data.$values||[]); // đảm bảo user luôn là một mảng
        setError(null);
      } else {
        setError(`Error: ${res?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Hệ thống đang gặp lỗi: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const handleReload = async () => {
    await loadData();
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete?');
      if (confirmDelete) {
        await instance.delete(`/User/delete/${userId}`);
        setUser(user.filter((item) => item.userId !== userId));
        alert('User deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleExport = () => {
    const formattedData = user.map((item, index) => ({
      '#': index + 1,
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      birthday: item.birthday,
      address: item.address,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'users.xlsx');
  };

  return (
    <>
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
              <CTableHeaderCell colSpan={8} scope="col">
                <Link to={'/theme/colors/add'}>
                  <CButton color="danger">Add</CButton>
                </Link>
                <CButton onClick={handleExport} color="danger">
                  Export Excel
                </CButton>
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
                    style={{ width: '100px', height: '100px' }}
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
      )}
    </>
  );
};

export default Colors;
