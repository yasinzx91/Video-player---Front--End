import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI'

function View({uplaodVideoStatus}) {

  const [allVideo , setAllVideos] = useState([])
  const [deleteVideoStatus,setdeleteVideoStatus] = useState(false)

  const getAllUploadedVideos = async()=>{
      const response = await getAllVideos()
     /*  console.log(response); */

     const {data} = response;
    /*  console.log(data); */
     setAllVideos(data)
     
  }

  useEffect(()=>{
    getAllUploadedVideos()
    setdeleteVideoStatus(false)
  },[uplaodVideoStatus,deleteVideoStatus])

  return (
    <>
        <Row>
          { allVideo.length>0?
            allVideo.map((videos)=>
            <Col sm={12} md={6} lg={4} xl={3}>
            <VideoCard displayVideo={videos} setdeleteVideoStatus={setdeleteVideoStatus}/>
        </Col>)
            :
            <p>Nothing to Display</p>
          }
        </Row>
        
    </>
  )
}

export default View