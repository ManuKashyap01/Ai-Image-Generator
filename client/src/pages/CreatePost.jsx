import React,{useState} from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField,Loader } from '../components'

const CreatePost = () => {
  const navigate=useNavigate()
  const [formdata, setformdata] = useState({
    name:'',
    prompt:'',
    photo:'',
  })
  const [loadingimg, setloadingimg] = useState(false)
  const [loading, setloading] = useState(false)

  const handleSubmit=()=>{

  }

  const handleChange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  const handleSurpriseMe=()=>{
    const randomPrompt=getRandomPrompt(formdata.prompt)
    setformdata({...formdata,prompt:randomPrompt})
  }

  const generateImg=async ()=>{
    if(formdata.prompt){
      try {
        setloadingimg(true)
        const response=await fetch('http://localhost:8080/api/v1/dalle',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({prompt:formdata.prompt})
        })

        const data=await response.json()

        setformdata({...formdata,photo:data.photo})
      } catch (error) {
        console.log('error in generate image function in create post',error)
      }finally{
        setloadingimg(false)
      }
    }else{
      alert('Please enter a prompt')
    }
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-4xl">
          Create Something New
        </h1>
        <p className='md:text-lg font-medium text-[#bada55] text-md italic'>"Let the world see your creativity"</p>
        <p className="mt-2 text-[#666e75] text-sm max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI Second Draft and share them with the community
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-12 max-w-3xl">
        <div className="flex flex-col gap-2">
          <FormField
            label="Your name"
            type="text"
            name="name"
            placeholder="Manu kashyap"
            value={formdata.name}
            handleChange={handleChange}
          />
          <FormField
            label="Prompt"
            type="text"
            name="prompt"
            placeholder="A toy robot sitting on red wall waiting to fall"
            value={formdata.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bada55 focus:border-bada55 w-64 p-3 h-64 flex justify-center items-center">
            {formdata.photo?(
              <img src={formdata.photo} alt={formdata.prompt} className='w-full h-full object-contain'/>
            ):(
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}
           {loadingimg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-black/[0.5] rounded-lg">
              <Loader/>
            </div>
           )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button type='button' onClick={generateImg} className='text-white bg-[#bada55] px-5 py-2.5 rounded-md w-full sm:w-auto text-center font-medium tracking-wide' >
            {loadingimg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-sm">Once you have created your image, You can even share it on the community timeline!</p>
            <button type='submit' className='mt-3 text-white bg-[#bada55] px-5 py-2.5 rounded-md w-full sm:w-auto text-center font-medium tracking-wide' >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost