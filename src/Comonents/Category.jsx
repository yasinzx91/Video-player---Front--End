import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addToCatagory, deleteCatagory, getAllCatagory, getVideoDetails, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Category() {

  const [catogoryname, setCatagoryName] = useState("")

  const [show, setShow] = useState(false);

  const [catagory, setCatagory] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to prevent reload

  const dragOver = (e)=>{
    e.preventDefault();
  }

  const videoDrop = async (e,categoryId)=>{
    console.log(`id is ${categoryId}`);
    let videoId = e.dataTransfer.getData('VideoID')
    console.log(`Video id is ${videoId}`);
    
    const {data} = await getVideoDetails(videoId)
    console.log(data);

    let selectedCategory = catagory.find(item=>item.id==categoryId)
    console.log(selectedCategory);

    selectedCategory.allVideos.push(data);

    await updateCategory(categoryId,selectedCategory)
    allCatagory()
  }

  const removeVideo = async()=>{

  }


  const handleAddCatagory = async()=>{
    //func to add catagory
     if(catogoryname)
     {
        let body = {
          catogoryname,
          allVideos:[],
        }

        const response = await addToCatagory(body);
        

        if(response.status>=200 && response.status<300)
        {
          toast.success('Catagory added successfully')
          setCatagoryName('');
          allCatagory()
        }
        else
        {
          toast.error("Somthing went wrong please try again")
        }
     }
     else
     {
        toast.warning('please fill the catagory name')
     }
     handleClose()
  }

  const allCatagory = async()=>{
    const {data} = await getAllCatagory();
    setCatagory(data);
  }

  const removeCatagory = async(id)=>{
    await deleteCatagory(id)
    allCatagory()
  }

  useEffect(()=>{
    allCatagory();
  },[catagory])


  return (
    <>
      <div className='d-grid ms-3'>
        <button className='btn btn-warning' onClick={handleShow}>Add New Category</button>
      </div>

    { catagory?.length>0?  
    catagory?.map((item)=>(
      <div className='m-5 border border-danger rounded p-3' 
      droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}
      >
      <div className="d-flex align-items-center justify-content-between">
           <p>{item.catogoryname}</p>
           <button className='btn btn-danger' onClick={()=>removeCatagory(item.id)}>
            <i class="fa-solid fa-trash"></i>
          </button>
      </div>

      <Row>
        <Col>
        {
          item?.allVideos.length>0?
          item?.allVideos.map((card)=>(<VideoCard displayVideo={card} remVideo={{item,card}}/>))
          :
          <p>Nothing</p>
        }
        </Col>
      </Row>


      </div>
    ))
   
      :
      <p>Nothing to Display</p>
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Catagory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>please fill the form completly</p>
          <Form action="" className='border border-secondary rounded p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Catagory name</Form.Label>
              <Form.Control type="text" onChange={(e)=>setCatagoryName(e.target.value)} placeholder="Enter new catogory name"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCatagory}>Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={1000}/>
    </>
  )
}

export default Category