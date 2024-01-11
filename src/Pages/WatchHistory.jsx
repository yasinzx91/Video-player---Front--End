import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistory, getAllHistory } from '../services/allAPI'

function WatchHistory() {

  const [history, setHistory] = useState({})

  const WatchAllHistory = async()=>{
    const{data} = await getAllHistory()
    setHistory(data)
  }

  useEffect(()=>{
    WatchAllHistory()
  },[])

  const removeHistory = async(id)=>{
      await deleteHistory(id);
      //to get the remaining history
      WatchAllHistory()
  }

  return (
   <>
      <div className='d-flex justify-content-between mt-5 container'>
        <h3>Watch History</h3>
        <Link to={'./home'} className="d-flex align-items-center" style={{textDecoration:'none',color:'white',fontSize:'20px'}}>
        <i class="fa-solid fa-arrow-left fa-beat me-3"></i>Back to Home
        </Link>
        </div>
        <table className='table mt-5 mb-5 container'>
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>Url</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tBody>
            {history.length>0?
              history.map((item,index)=>(
                
            <tr>
            <td>{index+1}</td>
            <td>{item.caption}</td>
            <td><a href={item.embedLink} target='_blank'>{item.embedLink}</a></td>
            <td>{item.timestamp}</td>
            <td>
              <button className='btn btn-danger' onClick={()=>removeHistory(item?.id)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
              )):
              <p>Nothing to display</p>
            }
          </tBody>
        </table>
   </>
  )
}

export default WatchHistory
 