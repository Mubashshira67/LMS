import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import { Route,Routes as Switch } from 'react-router-dom';

function Dashboard(){
  return (
    <div className="container mt-5">  
    <div className="row">
     <aside className="col-md-3">
          <Sidebar />
     </aside>
     <section className='col-md-9 '>
      Dashboard 
       
     </section>

    </div>
  </div>
    );
}

export default Dashboard;
