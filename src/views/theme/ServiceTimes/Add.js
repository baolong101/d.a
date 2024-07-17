import React from 'react'

import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { useForm } from 'react-hook-form'

const add = () => {
    const {reffister, handleSubmit}= useForm()

    const onSubmit=()=>{
        
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

export default add