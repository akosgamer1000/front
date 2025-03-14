import { AxiosError } from "axios";
import { Bookin } from "./Bookins";
import axios from "./axios";

interface Props{
    book:Bookin
}

const Book1 = (props:Props) => {
    
      
  async  function handle() {
        try {
            const response=await axios.post('/api/books/${props.id}/rent')
            if(response.status==200){
                console.log("sikeres")
            }
        } catch (error ) {
            console.log(error)
        }
    }

      return <>
        <div className="col border p-3">
            <div className="card">
            <h2>{props.book.tiltle}</h2>
            <h4>{props.book.suthor}</h4>
            <p>kiadási év{props.book.publish_year}</p>
            <p>{props.book.page_count}</p>
            <img src={`img/${props.book.suthor}.jpg`} alt={props.book.suthor}></img>
            <button className="btn btn-succes" onClick={handle}> foglalás</button>
            </div>
           
        </div>
      </>
    
};

export default Book1;