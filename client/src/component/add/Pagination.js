import React from 'react'
import '../styles/pagination.css';

function Pagination({ postsPerPage, totalPosts,Paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

  
    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map((number) => {
                    return (
                        <li key={number} className='page-item'>
                            <a onClick={()=>Paginate(number)}  className='page-link'>
                                {number}
                            </a>
                        </li>
                    )

                })}
            </ul>
            {/* <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a> */}
            {/* </div> */}

        </div>
    )
}

export default Pagination