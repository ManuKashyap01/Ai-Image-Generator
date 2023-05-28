import React,{useState,useEffect} from 'react'
import { Card, FormField, Loader } from '../components'
import {Sugar} from 'react-preloaders';

const RenderPosts=({data,title})=>{
  if(data?.length>0){
    return (
      data.map((post)=>{
        return <Card key={post._id} {...post}/>
      })
    )
  }
  
  return (
    <h2 className="mt-5 font-bold uppercase text-[#bada55] text-xl">
      {title}
    </h2>
  )
}

const Home = () => {
  const [loading, setloading] = useState(false)
  const [allposts, setallposts] = useState(null)
  const [querytext, setquerytext] = useState('')
  const [searchresults, setsearchresults] = useState(null)
  const [searchtimeout, setsearchtimeout] = useState(null)
  useEffect(() => {
    const fetchPosts=async()=>{
      setloading(true)
      try {
        fetch('https://ai-image-generator-sc0i.onrender.com/api/v1/post',{
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            },
          })
          .then(blob=>blob.json())
          .then(res=>{
            setallposts(res.data.reverse())
            setloading(false)
            console.log(allposts)
          })
      } catch (error) {
        console.log('error in fetchposts function on home page',error)
        setloading(false)
      }
    }
    fetchPosts()
  },[])

  const handleSearch=(e)=>{
    clearTimeout(searchtimeout)

    setquerytext(e.target.value)
    
    setsearchtimeout(
      setTimeout(() => {
        const searchRes=allposts.filter((item)=>{
          return item.name.toLowerCase().includes(querytext.toLowerCase())
          || item.prompt.toLowerCase().includes(querytext.toLowerCase())
        })
        setsearchresults(searchRes)
      }, 500)
    )
  }
  
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-4xl">
          The Community Showcase
        </h1>
        <p className='md:text-lg font-medium text-[#bada55] text-md italic'>"Let the world see your creativity"</p>
        <p className="mt-2 text-[#666e75] text-sm max-w-[500px]">
          Browse through the collection of imaginative and visually stunning images generated by DALL-E AI Second Draft
        </p>

        <div className="mt-16">
          <FormField 
            label='Search posts'
            type='text'
            name='text'
            placeholder='Search Posts'
            value={querytext}
            handleChange={handleSearch}
          />
        </div>

        <div className="mt-10">
          <Sugar customLoading={allposts==null} background='#bada55' time={0}/>
            {!loading && 
            <>{querytext && (
              <h2 className="font-medium text-[#666e75] mb-3 text-xl">
                Showing results for <span className='text-[#bada55]'>{querytext}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {querytext?(
                  <RenderPosts
                    data={searchresults}
                    title="No search results found!"
                  />
                ):(
                  <RenderPosts
                    data={allposts}
                    title="No posts found!"
                  />
              )}
              </div>
              </>}
        </div>
      </div>
    </section>
  )
}

export default Home