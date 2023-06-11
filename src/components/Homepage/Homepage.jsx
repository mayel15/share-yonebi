import React from "react";
import Search from "../Search";
import Resource from "../Resource/Resource";
import { useState, useEffect } from "react";
import HeaderNav from "../Header/HeaderNav";
import Sidebar from "../Sidebar/Sidebar";

export default function Homepage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/resources/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setResources(data.slice(0,10));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row content-section content-center">
      <Sidebar />
      <div className="welcome-section col-lg-9">
        <h2>Bienvenue dans yonebi. </h2>
        <p>Votre banque de liens de ressources numériques.<br/>Accéder aux meilleures formations gratuites.</p>
        
        <h3> Voici quelques unes ! </h3>
        <div className="row">
          {
            resources.map((r, index) => (
              <Resource
                title={r.title}
                key={r.id}
                url={r.url}
                authors={r.authors}
                addedAt={r.addedAt.toString()}
                description={r.description}
                subject={r.subject}
                category={r.category}
                id={r._id}
              />))
          }
        </div>
      
      </div>
      
    </div>
  );
}
