import React, { useEffect, useState } from 'react';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { instance } from 'src/apis';
import { useNavigate } from 'react-router-dom';

const Typography = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  const loadData=async()=>{
    try {
      const res = await instance.get('/Category');
      console.log(res.data.statusCode);
      if (res.data.statusCode === 200) {
        setCategory(res.data.data);
        setError(null); 
      } else {
        setError(`Error: ${res.data.message}`);
       
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Hệ thống đang gặp lỗi: ${error}`);
     
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await loadData()
    };
    
    fetchData();
  }, []);

  const handleDelete = async (categoriesID) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        await instance.delete(`/Category/delete/${categoriesID}`);
        setCategory(category.filter((item) => item.categoriesID !== categoriesID));
        alert('Delete successful');
      }
    } catch (error) {
      console.log('Error deleting:', error);
      alert('Delete failed');
    }
  };

  const handleReload =async () => {
   await loadData()
  };
  const handleBack = () => {
    navigate('/');
  };

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
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {category.map((item, index) => (
              <CTableRow key={item.categoriesID}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.categoryName}</CTableDataCell>
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
                  <CButton onClick={() => handleDelete(item.categoriesID)}>delete</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </>
  );
};

export default Typography;
