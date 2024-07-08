import React, { useState } from 'react';
import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CFormSelect,
  CFormCheck,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { instance } from 'src/apis';

const Add = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    sex: false,
    avatar: null, // Initialize avatar as null for file data
    typeUser: false,
    status: 0,
  });

  const {
    register,
    handleSubmit,
    setValue
  } = useForm();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Assuming single file upload
    setUser((prevState) => ({
      ...prevState,
      avatar: file
    }));
  };

  const onSubmit = async (userData) => {
    try {
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('birthday', userData.birthday);
      formData.append('sex', userData.sex);
      formData.append('avatar', user.avatar); // Append the file from state
      formData.append('typeUser', userData.typeUser);
      formData.append('status', userData.status);

      const { data } = await instance.post('/User/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(userData);
      navigate('/theme/colors');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <CCol md={4}>
        <CFormInput 
          type="text" 
          id="fullName" 
          label="Full Name" 
          {...register('fullName')} 
        />
      </CCol>
      <CCol md={4}>
        <CFormInput 
          type="email" 
          id="email" 
          label="Email" 
          {...register('email')} 
        />
      </CCol>
      <CCol md={4}>
        <CFormInput 
          type="text" 
          id="phone" 
          label="Phone" 
          {...register('phone')} 
        />
      </CCol>
      <CCol md={4}>
        <CFormInput 
          type="text" 
          id="address" 
          label="Address" 
          {...register('address')} 
        />
      </CCol>
      <CCol md={4}>
        <CFormInput 
          type="date" 
          id="birthday" 
          label="Birthday" 
          {...register('birthday')} 
        />
      </CCol>
      <CCol md={4}>
      <CFormSelect 
          id="typeUser" 
          label="Sex" 
          {...register('sex')} 
        >
          <option value="true">nam</option>
          <option value="false">nữ</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <input
          type="file"
          id="avatar"
          onChange={handleAvatarChange}
        />
      </CCol>
      <CCol md={4}>
        <CFormSelect 
          id="typeUser" 
          label="Type User" 
          {...register('typeUser')} 
        >
          <option value="true">nhân viên</option>
          <option value="false">khách hàng</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormInput 
          type="number" 
          id="status" 
          label="Status" 
          {...register('status')} 
        />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit Form
        </CButton>
      </CCol>
    </CForm>
  );
};

export default Add;
