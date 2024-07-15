import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import React from 'react'
import Placeholders from './../../base/placeholders/Placeholders';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { instance } from 'src/apis';
import Alerts from './../../notifications/alerts/Alerts';
const Add = () => {
    const {register, handleSubmit}= useForm()
    const navigate = useNavigate();

        const onSubmit = async(data)=>{
            try {
                const formData= new FormData()
                formData.append('supplierName',data.supplierName)
                formData.append('phone',data.phone)
                formData.append('email',data.email)
                formData.append('address',data.address)
                await instance.post('/Supplier/Create',formData);
                alert("Add success"),
                    navigate('/theme/supplire')
            } catch (error) {
                alert("Add failed" + error),
                    console.error(error)
            }

        }
  return (
    <div className="p-4">
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCol className="mb-3">
          <CFormInput
            type="text"
            id="supplierName"
            name="supplierName"
            placeholder="Tên nhà cung cấp"
            {...register('supplierName', { required: true })}
          />
        </CCol>
        <CCol className="mb-3">
          <CFormInput
            type="text"
            id="phone"
            name="phone"
            placeholder="Số điện thoại"
            {...register('phone', { required: true })}
          />
        </CCol>
        <CCol className="mb-3">
          <CFormInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
        </CCol>
        <CCol className="mb-3">
          <CFormInput
            type="text"
            id="address"
            name="address"
            placeholder="Địa chỉ"
            {...register('address', { required: true })}
          />
        </CCol>
        <CCol className="text-right">
          <CButton color="primary" type="submit">
            Thêm nhà cung cấp
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}

export default Add
