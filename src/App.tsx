

import React, { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from './axios'
import"bootstrap/dist/css/bootstrap.css";
import { Bookin } from './Bookins';
import Book1 from './book';
import { AxiosError } from 'axios';


function App() {
  const[books,setBooks]=useState<Bookin[]>([]);
const[formerror,setFromError]=useState("");
  const tiltlehorref=useRef<HTMLInputElement>(null)
  const authorref=useRef<HTMLInputElement>(null)
  const publisref=useRef<HTMLInputElement>(null)
  const page_countref=useRef<HTMLInputElement>(null)
console.log(books);


  async  function load(){
    try{
      const response= await axios.get("/api/books")
      setBooks(response.data.data)
    }
    catch(error){
      console.log(error)
      setBooks([
        {
            "id": 1,
            "tiltle": "Quo Animi Quia Eveniet Aut",
            "suthor": "Jaida Nitzsche",
            "publish_year": 1965,
            "page_count": 120
        },
        {
            "id": 2,
            "tiltle": "Eum Magni Fugit",
            "suthor": "Ardella Bauch",
            "publish_year": 2000,
            "page_count": 774
        },
        {
            "id": 3,
            "tiltle": "Id Voluptas Omnis",
            "suthor": "Kyla Kertzmann III",
            "publish_year": 1996,
            "page_count": 676
        }
      ]
      )

    }
    
  
    
   }
  useEffect(()=>{
   
   load()

  },[])
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const book={
      
      tiltle:tiltlehorref,
      suthor:authorref,
      publish_year:publisref,
      page_count:page_countref
    }
    try{
      const response= await axios.post("/api/books",book)
      if(response.status==201){
        load()
      }
      else{
        console.log("Nem megfelelö formátum")
      }
    }
    catch(error){
     if(error instanceof AxiosError){
       const Axioserror=error.response!.data.message.join(" ");
       setFromError(Axioserror)
     }
      console.log(error)
    }

  }

  return (
    <>
      <header>
        <nav className='navbar navbar-expand-lg'>
          <div className='container-fluid'>
            <div className='collabse navbar-collabse' id='navbarNev'>
              <ul className='navbar-nav'>
            <li className='nav-item '>
              <a className='navbar-link text-primary' href='#bookform'>új könyv</a></li>
            <li className='nav-item'>
              <a className='navbar-link text-primary' href='petrik.hu'>petrik</a></li>
          </ul>
          </div>
            
          </div>
          
        </nav>
        <div className='container-fluid'>
        <h1>Petrik</h1>
        </div>
       
      </header>
      <main className='container'>
          <div id='booklist' className='row row-cols-lg-3 row-cols ssmd-2 row-cols-1 '>
              {books.map(book=><Book1 key={book.id} book={book} />)}
          </div>

          <div id='bookform' className='mt-3'>
              <h2>új könyv</h2>
              {formerror!=""&&<div className='alert'>{formerror} </div>}
              <form onSubmit={handleSubmit}>
                    <div className="mb-3" id='tiltle'>
                      <label htmlFor="tiltle" className="form-label"></label>
                      <input type="text" className="formcontrol"  ref={tiltlehorref}/></div>
                    <div className="mb-3" id='author'>
                      <label htmlFor="author" className="form-label">
                        </label>
                        <input type="text" className="formcontrol"  ref={authorref}/></div>
                    <div className="mb-3" id='Kiadási'>
                      <label htmlFor="Kiadási" className="form-label">
                        </label>
                        <input type="text" className="formcontrol" ref={page_countref} /></div>
                    <div className="mb-3" id='pagecount'>
                      <label htmlFor="pagecount" className="form-label">
                        </label><input type="text" className="formcontrol" ref={page_countref} /></div>
                        <button type='submit' className='button button-primary'>submit</button>
              </form>
          </div>
         
      </main>
      <footer  className='container-fluid'>
        Készitette:Mémeth Ákos
      </footer>
    </>
  )
}

export default App
