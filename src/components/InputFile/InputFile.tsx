import { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1 MB, Định dạng:.JPEG, .PNG', {
        autoClose: 1000
      })
    } else if (onChange) {
      onChange(fileFromLocal)
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  const handleUpload = () => {
    inputFileRef.current?.click()
  }
  return (
    <div className='my-3.5'>
      <input ref={inputFileRef} type='file' accept='.jpg,.jpeg,.png' className='hidden' onChange={onFileChange} />
      <button
        onClick={handleUpload}
        type='button'
        className='py-2 px-3.5 text-sm rounded-xs border border-gray-200 cursor-pointer hover:bg-gray-50'
        aria-label='Chọn Ảnh'
      >
        Chọn Ảnh
      </button>
    </div>
  )
}
