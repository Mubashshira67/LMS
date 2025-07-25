import {Link} from 'react-router-dom'
function PopularCourses(){
  return (
  
     <div className='container mt-5'>
     {/*All Popular courses */}
  <h3 className="pb-1 mb-4">All Popular Courses</h3>
     <div className="row mb-4">
       <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div>
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div> 
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
             <div className="col-md-3 mb-4">
          <div className="card" >
             <Link to="/detail/1"><img src="course.png" className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
               <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
            </div> 
                        <div className='card-footer'>
               <div className='title'>
                  <span>Rating: 4.5/5</span>
                  <span className='float-end'>Views: 1234</span>
               </div>
            </div>
          </div>
      </div>
            

     </div>
     {/*End All courses */}

    {/*course pagination */}
    <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
    {/*end course pagination */}
     </div> 
     
  );
}

export default PopularCourses;