import { React, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import GestionButtons from "../GestionButtons/GestionButtons";
import Resource from "../Resource/Resource";
import Loading from "../Loading/Loading";
import HeaderNav from "../Header/HeaderNav";

export default function AdminHome() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://yonebi-back.vercel.app/api/resources/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log(data.sort((a, b) => a.title.localeCompare(b.title)));
                setResources(data.sort((a, b) => a.title.localeCompare(b.title)));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <HeaderNav />
            <div className="row content-section" style={{width: "100%"}}>
                <Sidebar view='admin' />
                <div className="col-lg-9">
                    <div className="text-center">
                        <h2>Bienvenue dans l'admin de share.yonebi. </h2>
                        <p>Votre banque de liens de ressources numériques</p>
                    </div>
                    <GestionButtons />
                    <div className="row">
                        {(!resources.length) ? <Loading url='https://i.gifer.com/XlO9.gif' />
                            : resources.map((r, index) => (
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
                                    view='admin'
                                />))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}