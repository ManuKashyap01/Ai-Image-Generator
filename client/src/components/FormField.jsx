import React from 'react'

const FormField = ({label,type,name,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-5 mb-3">
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
          {label}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#bada55] py-1 px-2 rounded-md'
          >
            Surprise me
          </button>
        )}
      </div>
      <input 
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#bada55] focus:border-[#bada55] outline-none border w-full p-3 block'
      />
    </div>
  )
}

export default FormField