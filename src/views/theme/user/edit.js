import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from 'src/apis';

const EditProduct = () => {
  const { id } = useParams(); // Lấy id của user từ URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    sex: false,
    avatar: '',
    typeUser: false,
    status: 0,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset // Added reset function from useForm
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(`/User/${id}`);
        setUser(data);
        // Set initial form values using setValue from react-hook-form
        setValue('fullName', data.fullName);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('address', data.address);
        setValue('birthday', data.birthday);
        setValue('sex', data.sex.toString());
        setValue('avatar', data.avatar); // Display current avatar filename
        setValue('typeUser', data.typeUser.toString());
        setValue('status', data.status.toString());
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (userData) => {
    try {
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('birthday', userData.birthday);
      formData.append('sex', userData.sex);
      if (userData.avatar[0]) {
        formData.append('avatar', userData.avatar[0]); // Append file if exists
      }
      formData.append('typeUser', userData.typeUser);
      formData.append('status', userData.status);

      const { data } = await instance.put(`/User/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(data);
      reset(); // Reset form fields after successful submission
      navigate('/theme/colors');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
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
            type="text"
            id="birthday"
            label="Birthday"
            {...register('birthday')}
          />
        </CCol>
        <CCol md={4}>
          <CFormSelect
            id="sex"
            label="Sex"
            {...register('sex')}
            defaultValue={user.sex} // Sử dụng defaultValue để hiển thị giá trị ban đầu
          >
          <option value="true">nam</option>
          <option value="false">nữ</option>
          </CFormSelect>
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="file"
            id="avatar"
            label="Avatar"
            {...register('avatar')}
          />
        </CCol>
        <CCol md={4}>
          <CFormSelect
            id="typeUser"
            label="Type User"
            {...register('typeUser')}
            defaultValue={user.typeUser}
          >
            <option value="true">nhan vien</option>
            <option value="false">khach hang</option>
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
            Update User
          </CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default EditProduct;
