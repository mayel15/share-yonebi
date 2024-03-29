import React from "react";
import { Link } from "react-router-dom";

export default function GestionButtons() {
    return (
        <div className="text-center">
            <button>
                <Link to='/admin/home/' >Gérer les ressources</Link>
            </button>
            <button
            >
                <Link to='/admin/add' >Ajouter une ressource</Link>
            </button>
            <button
            >
                <Link to='/admin/subjects/' >Gérer les sujets</Link>
            </button>
            <button>
                <Link to='/admin/categories/' >Gérer les catégories</Link>
            </button>
        </div>
    )
}