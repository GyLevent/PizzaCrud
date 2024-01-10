import React, { useState, useEffect } from "react";
import "./App.css";
import { NavLink } from "react-router-dom";

export function PizzaHome() {
  const [isFetchPending, setFetchPending] = useState(false);
  const [pizzaget, pizzaset] = useState([]);
  useEffect(() => {
    setFetchPending(true);
    fetch("https://pizza.kando-dev.eu/Pizza")
      .then((res) => res.json())
      .then((data) => pizzaset(data));
    setFetchPending(false);
  }, []);

  return (
    <div>
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h1 className="text-center">Pizzák</h1>
          <div className="d-flex justify-content-around">
            {pizzaget.map((pizza) => (
              <div className="card flex-fill">
                <p>Pizza neve: {pizza.name}</p>
                <b>Glutén mentes-e: {pizza.isGlutenFree ? "Igen" : "Nem"}</b>
                <img
                  height="150px"
                  width="300px"
                  src={pizza.kepURL}
                  alt={pizza.id}
                ></img>
                <form>
                  <button type="button" class="btn btn-info">
                    <NavLink to={`/mod/${pizza.id}`}>Módosítás</NavLink>
                  </button>
                </form>
                <form
                  onSubmit={(event) => {
                    fetch(`https://pizza.kando-dev.eu/Pizza/${pizza.id}`, {
                      method: "DELETE",
                    });
                  }}
                >
                  <button type="button" class="btn btn-danger">
                    Törlés
                  </button>
                </form>
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              const requestbody = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: event.target.pizzanev.value,
                  isGlutenFree: event.target.glutencheck ? 0 : 1,
                  kepURL: event.target.keplinkek.value,
                }),
              };
              fetch("https://pizza.kando-dev.eu/Pizza", requestbody).then(
                (response) => response.json()
              );
            }}
          >
            <div className="form-group">
              <label for="exampleFormControlInput1">Pizza név</label>
              <input
                type="text"
                class="form-control"
                id="pizzanev"
                placeholder="Pizza név(Példa:Négy sajtos)"
              />
              <input
                type="checkbox"
                class="form-check-input"
                id="glutencheck"
              ></input>
              <label class="form-check-label" for="exampleCheck1">
                Glutén mentes?
              </label>
              <input
                type="text"
                class="form-control"
                id="keplinkek"
                placeholder="kép link"
              />
              <button type="button" class="btn btn-success">
                Mentés
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PizzaHome;
