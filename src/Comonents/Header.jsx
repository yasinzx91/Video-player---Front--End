import React from 'react'
import Container from 'react-bootstrap/Container'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">
              <Link to={'/'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}></Link>
              <i class="fa-solid fa-video fa-beat text-success me-3"></i>
              <span className='text-danger'>Video Player</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header