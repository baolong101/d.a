import React, { useState } from 'react';
import { CCol, CForm, CFormInput, CButton } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { instance } from 'src/apis';

const AddCategory = () => {
  const navigate= useNavigate()
  const [category, setCategory] = useState({
    categoryName: '',
    image: null,
  });

  const { register, handleSubmit } = useForm();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setCategory((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('categoryName', category.categoryName);
      formData.append('image', category.image);
      
      // Change 'instance' to your actual Axios instance
      const response = await instance.post('/Category/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log('Response from server:', response.data);

      // Reset form values after successful submission (if needed)
      setCategory({
        categoryName: '',
        image: null,
      });

      // Navigate to another page upon successful submission
      navigate('/theme/typography');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCol md={4}>
          <CFormInput
            type="text"
            id="categoryName"
            name="categoryName"
            placeholder="Category Name"
            {...register('categoryName')}
            value={category.categoryName}
            onChange={(e) =>
              setCategory({
                ...category,
                categoryName: e.target.value,
              })
            }
          />
        </CCol>
        <CCol md={4}>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
          />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit Form
          </CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default AddCategory;
