import React, { useEffect, useState } from 'react'
export type Recipe = {
    category: string;
    description: string;
    id: string;
    image: string;
    label: string;
    name: string;
    price: string;
}

type Props = {
    selectedRecipe: Recipe
}

const RecipeDetails = ({ selectedRecipe }: Props) => {

    return (
        <div className="recipe-details" >
            <div className="card" key={selectedRecipe.id}>
                <span className="card-header">
                    <div className="card-category">
                        {selectedRecipe.category}
                    </div>
                    <img src={selectedRecipe.image} alt={selectedRecipe.name} />
                    <span className="card-title">
                        <h3>{selectedRecipe.name}</h3>
                    </span>
                </span>
                <span className="card-summary">
                    <ul>

                        <li><i className="fa fa-clock-o" aria-hidden="true"></i>15 min</li>
                        <li><i className="fa fa-inr" aria-hidden="true"></i>{selectedRecipe.price}</li>
                        {selectedRecipe.label && <li><i className="fa fa-tag" aria-hidden="true"></i>{selectedRecipe.label}</li>}
                    </ul>
                    <p>
                        {selectedRecipe.description}
                    </p>
                </span>
            </div>
            <div>
                <h2>Ingredients</h2>
                <p>You can add your ingredients here...</p>
                <h2>How to prepare?</h2>
                <p>You can add the steps neccessary to prepare this dish in this section...</p>
            </div>
        </div>
    )
}

export default RecipeDetails;