import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import { Route,Routes as Switch } from 'react-router-dom';

function RecommendedCourses(){
  return (
    <div className="container mt-5">  
    <div className="row">
     <aside className="col-md-3">
          <Sidebar />
     </aside>
     <section className='col-md-9 '>
      <div className="card">
       <h5 className='card-header'>Recommended Courses</h5>
        <div className="card-body">
        <table className='table table-bordered'>
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Created By</th>
                 <th>Action</th>

             </tr>
         </thead>
                  <tbody>
             <tr>
                 <td>Php Development</td>
                 <td><Link to="">Mr K</Link></td>
                 <td>
                  <button className="btn btn-danger btn-sm active">
                    Delete
                  </button>
                 </td>

             </tr>
         </tbody>
        
       </table>
        
       </div>
       </div>
       
     </section>

    </div>
  </div>
    );
}

export default RecommendedCourses;