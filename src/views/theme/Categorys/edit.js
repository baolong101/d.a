import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from 'src/apis'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({ categoryName: '', image: '' })
  const { register, handleSubmit, setValue, reset } = useForm()
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(`Category/${id}`)
        setCategory(data)
        setValue('categoryName', data.categoryName)
        setValue('image', data.image)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id, setValue])

  const onImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('categoryName', data.categoryName)
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const response = await instance.put(`/Category/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      reset()
      setCategory(response.data)
      alert('Update successful')
      navigate('/theme/typography')
    } catch (error) {
      console.log(error)
      alert('Update failed: ' + error)
    }
  }

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
          />
        </CCol>
        <CCol md={4}>
          <input
            type="file"
            id="image"
            name="image"
            {...register('image')}
            onChange={onImageChange}
          />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit Form
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}

export default Edit
