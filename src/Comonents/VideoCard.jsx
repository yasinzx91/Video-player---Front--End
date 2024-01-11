import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { addToHistory, deleteVideo } from '../services/allAPI';
import Modal from 'react-bootstrap/Modal';

function VideoCard({displayVideo,setdeleteVideoStatus,remVideo}) {

  const removeVideo = async(id)=>{
    
    if(remVideo)
    {
      console.log(remVideo);

      let remVideoId = remVideo.card.id;
      let remCatId = remVideo.item.id;
      let selectedCategory = remVideo;
    }
    else
    {
      const response = await deleteVideo(id);
      setdeleteVideoStatus(true)
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true);

    const {caption,embedLink} = displayVideo;
    const today = new Date()

    let timestamp = new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)

    let videoDetails={
      caption, embedLink, timestamp
    }

    const response = await addToHistory(videoDetails)
  }

  //to drag a particular item
  const dragStart = (e,id)=>{
      console.log(`card that draged is ${id}`);

      //to tranfer id from videocard to catagory
      e.dataTransfer.setData('VideoID',id)
  }

  return (
    <>
        <Card style={{ width: '100%', height:'300px' }} draggable onDragStart={(e)=>dragStart(e,displayVideo.id)}>
          <div style={{overflow:'hidden',height:'320px'}}>
            <Card.Img onClick={handleShow} height={'100%'} style={{objectFit:'cover'}} variant="top" src={displayVideo.url} />
            </div>
          <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-center'>
              <h6>{displayVideo.caption}</h6>
              <button className='btn btn-warning' onClick={()=>removeVideo(displayVideo?.id)}>
                <i class="fa-solid fa-trash"></i></button>
            </Card.Title>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="502" src={`${displayVideo.embedLink}?autoplay=1`} title={displayVideo.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
      </Modal>


    </>
  )
}

export default VideoCard