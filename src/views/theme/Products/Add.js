import React, { useEffect, useState } from 'react';
import { CForm, CCol, CFormInput, CButton } from '@coreui/react';
import { instance } from 'src/apis';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    productName: '',
    categoriesID: '',
    unit: '',
    costPrite: 0,
    price: 0,
    quantity: 0,
    image: null,
    status: 'status',
  });
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get('/Category'); // Adjust endpoint based on your API
        setCategories(response.data.data.$values || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('productName', data.productName);
      formData.append('categoriesID', data.categoriesID);
      formData.append('unit', data.unit);
      formData.append('costPrite', data.costPrite);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);
      formData.append('image', data.image[0]); // Assuming single file upload
      formData.append('status', '1'); // Default status

      await instance.post('/Product/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Thêm sản phẩm thành công');
      navigate('/theme/product');
    } catch (error) {
      console.error('Thêm sản phẩm thất bại:', error);
      alert('Thêm sản phẩm thất bại: ' + error.message);
    }
  };

  return (
    <>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCol>
          <CFormInput
            type="text"
            id="productName"
            name="productName"
            placeholder="Tên sản phẩm"
            {...register('productName', { required: true })}
          />
        </CCol>
        <CCol>
          <select id="categoriesID" name="categoriesID" {...register('categoriesID', { required: true })}>
            {categories.map((category) => (
              <option key={category.categoriesID} value={category.categoriesID}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </CCol>
        <CCol>
          <CFormInput
            type="text"
            id="unit"
            name="unit"
            placeholder="Đơn vị"
            {...register('unit', { required: true })}
          />
        </CCol>
        <CCol>
          <CFormInput
            type="text"
            id="costPrite"
            name="costPrite"
            placeholder="Giá vốn"
            {...register('costPrite', { required: true })}
          />
        </CCol>
        <CCol>
          <CFormInput
            type="text"
            id="price"
            name="price"
            placeholder="Giá bán"
            {...register('price', { required: true })}
          />
        </CCol>
        <CCol>
          <CFormInput
            type="text"
            id="quantity"
            name="quantity"
            placeholder="Số lượng"
            {...register('quantity', { required: true })}
          />
        </CCol>
        <CCol>
          <input
            type="file"
            id="image"
            name="image"
            {...register('image', { required: true })}
            onChange={handleImageChange}
          />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Thêm sản phẩm
          </CButton>
        </CCol>
      </CForm>
    </>
  );
};

export default AddProduct;
