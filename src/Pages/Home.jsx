import React, { useState } from 'react'
import Add from '../Comonents/Add'
import { Link } from 'react-router-dom'
import View from '../Comonents/View'
import Category from '../Comonents/Category'

function Home() {

  const [uplaodVideoStatus,setUploadVideoStatus] = useState({})

  return (
    <>
    
    <div className='container mt-5 mb-5 d-flex justify-content-between align-items-center'>
      <div className='add-videos'>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <Link to={'/watch-history'} style={{textDecoration:'none',color:'red',fontSize:'30px'}}>Watch History</Link>
    </div>

    <div className='container w-100 mt-5 mb-5 d-flex justify-content-center-between'>
      <div className='all-videos col-lg-9'>
        <h4 className='mb-5'>All Videos</h4>
        <View uplaodVideoStatus={uplaodVideoStatus}/>
      </div>
      <div className='category col-lg-3'>
        <Category/>
      </div>
    </div>
 
    </>
  )
}

export default Home