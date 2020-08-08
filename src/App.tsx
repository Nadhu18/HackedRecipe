import React, { useEffect, useState } from 'react';
import clockImg from './Assets/Icons/Icon feather-clock.png';
import './App.css';
import RecipeDetails from './RecipeDetails';

export type Recipe = {
  category: string;
  description: string;
  id: string;
  image: string;
  label: string;
  name: string;
  price: string;
}

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showDetails, setShowDetails] = useState({ visible: false, id: "" })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://starlord.hackerearth.com/recipe").then(recipes => recipes.json()).then(recipes => {
      console.log("recipes", recipes);
      setRecipes(recipes);
      setLoading(false);
      localStorage.setItem("recipes", recipes);
    });
  }, []);


  if (loading) {
    return (
      <div className="container" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <i className="fa fa-spinner fa-6x" aria-hidden="true"></i>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="search">
        <span className="search-icon"><i className="fa fa-search" aria-hidden="true" /></span>
        <input type="text" className="search-bar" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
      </div>
      <div className="cards">
        {recipes.map((x: Recipe) => {
          return (
            <div className="card" key={x.id}>
              <span className="card-header">
                <div className="card-category">
                  {x.category}
                </div>
                <img src={x.image} alt={x.name} />
                <span className="card-title">
                  <h3><span style={searchText && x.name.toLowerCase().includes(searchText) ? { backgroundColor: "yellow", color: "#928787" } : {}}>{x.name}</span></h3>
                </span>
              </span>
              <span className="card-summary">
                <ul>

                  <li><i className="fa fa-clock-o" aria-hidden="true"></i>15 min</li>
                  <li><i className="fa fa-inr" aria-hidden="true"></i>{x.price}</li>
                  {x.label && <li><i className="fa fa-tag" aria-hidden="true"></i>{x.label}</li>}
                </ul>
                <p>
                  {x.description}
                </p>
              </span>
              <span className="card-meta">
                <button className="btn" onClick={() => setShowDetails({ id: x.id, visible: true })}>View Details</button>
              </span>
            </div>
          )
        })}
      </div>


      {showDetails.visible && (
        <div className="modal" style={{ display: "block" }}>

          <div className="modal-content">
            <span className="close" onClick={() => setShowDetails({ visible: false, id: "" })}>&times;</span>
            <RecipeDetails selectedRecipe={recipes.filter(x => x.id === showDetails.id)[0]} />
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
