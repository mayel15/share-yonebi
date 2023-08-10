import React, { useState, useEffect } from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Sidebar(props) {
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('https://yonebi-back.vercel.app/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const subjectsResponse = await fetch('https://yonebi-back.vercel.app/api/subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
        <nav className="sidebar col-lg-3">
            <ul className="sidebar-nav">
                {(!subjects.length) ? <Loading url='https://i.gifer.com/XOsX.gif' />
                : subjects.map((s, index)=>{
                    return (
                        <li key={index} id={index}>
                            {/*<Link to={"/"+s.name}>{s.name}</Link>*/}
                            <div>{s.name}</div>
                            <ul className="sub-nav">
                                {categories.map((c, index)=>{
                                    return (c.subject === s.name)
                                    ? ((props.view === 'admin')
                                      ?(<li key={index} id={index}><Link to={"/admin/"+s.name+"/"+c.name}>{c.name}</Link></li>)
                                      :(<li key={index} id={index}><Link to={"/"+s.name+"/"+c.name}>{c.name}</Link></li>))
                                    : null
                                    
                                })}

                            </ul>
                        </li>
                    )
                })
                }
            </ul>
        </nav>
    );
}

