import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { instance } from 'src/apis'
import { useForm } from 'react-hook-form'
import { CForm, CCol, CFormInput, CButton } from '@coreui/react'

const Edit = () => {
  const { id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const [supplier, setSupplier] = useState({
    supplierID: 0,
    supplierName: '',
    phone: '',
    email: '',
    address: '',
  })

  useEffect(()=>{
    const fetchData= async()=>{
      const {data}= await instance.get(`/Product/${id}`)
      setSupplier(data)
      setValue('supplierName', data.supplierName),
      setValue('phone', data.phone),
      setValue('uniemailt', data.email),
      setValue('address', data.address)
    }
    fetchData()
  },[id, setValue])

  const onSubmit = async (formData) => {
    try {
      await instance.put(`Supplier/${id}`, formData)
      alert('Cập nhật nhà cung cấp thành công')
    } catch (error) {
      console.error('Cập nhật nhà cung cấp thất bại:', error)
      alert('Cập nhật nhà cung cấp thất bại: ' + error.message)
    }
  }

  return (
    <div className="p-4">
      {supplier &&(
        <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCol className="mb-3">
          <CFormInput
            type="text"
            id="supplierName"
            name="supplierName"
            placeholder="Tên nhà cung cấp"
            defaultValue={supplier?.supplierName}
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
            Cập nhật nhà cung cấp
          </CButton>
        </CCol>
      </CForm>
      )}
    </div>
  )
}

export default Edit
