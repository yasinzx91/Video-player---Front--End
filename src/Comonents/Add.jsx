import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadAllVideos } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function Add({setUploadVideoStatus}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[videos, setVideos] = useState({
      id:'',
      caption:'',
      url:'',
      embedLink:''
    });
    console.log(videos);

    const embedVideoLink = (e)=>{
      const {value} = e.target;
      console.log(value.slice(-11));
      const  link = `https://www.youtube.com/embed/${value.slice(-11)}`
      setVideos({...videos,embedLink:link})
    }

    const handleUplaod = async()=>{
      const {id,caption,url,embedLink} = videos;
      if(!id || !caption || !url || !embedLink)
      {
        toast.warning('please fill all field')
      }
      else
      {
        const response = await uploadAllVideos(videos)
        console.log(response);

        if(response.status>=200 && response.status<300)
        {
            toast.success('successfull')
            setVideos({
              id:'',
              caption:'',
              url:'',
              embedLink:''
            });
            setUploadVideoStatus(response.data)
            handleClose()
        }
        else
        {
          console.log(response);
          toast.error('somthing went wrong. Try again')
        }
      }
    }

  return (
<>
        <div className='d-flex align-items-center'>
            <h5 className='me-2'>Upload new video</h5>
            <button onClick={handleShow} className='btn bg-black hover-bg-dark'><i class="fa-solid fa-upload fs-5"></i></button>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-3"></i>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the form</p>

          <form className='border-danger p-2 rounded'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video id" 
                onChange={(e)=>setVideos({...videos,id:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video Caption"  
                onChange={(e)=>setVideos({...videos,caption:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video Image Url"  
                onChange={(e)=>setVideos({...videos,url:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter Video Link" 
                onChange={embedVideoLink}/>
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUplaod}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={1000}/>
</>
  )
}

export default Add