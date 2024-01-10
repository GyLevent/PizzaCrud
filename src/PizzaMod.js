import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function PizzaMod() {
  let { pizzaid } = useParams();
  const [pizza, setpizza] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch(`https://pizza.kando-dev.eu/Pizza/${pizzaid}`, {})
      .then((res) => res.json())
      .then((pizza) => setpizza(pizza))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, [pizzaid]);
  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Pizza</h2>

          <div className="card col-sm-3 d-inline-block m-1 p-2">
            <h6 className="text-muted">{pizza.name}</h6>
            <h5 className="text-muted">
              Gluténmentes-e: {pizza.isGlutenFree ? "Igen" : "Nem"}
            </h5>
            <div className="card-body">
              <img
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={pizza.kepURL ? pizza.kepURL : ""}
                alt="Teszt"
              />
              <form
                onSubmit={(event) => {
                  const requestbody = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: event.target.pizzaname.value,
                      isGlutenFree: event.target.glutencheck.value ? 0 : 1,
                      kepURL: event.target.keplink.value,
                    }),
                  };
                  fetch(
                    `https://pizza.kando-dev.eu/Pizza/${pizzaid}`,
                    requestbody
                  ).then((response) => response.json());
                }}
              >
                <input
                  type="text"
                  class="form-control"
                  id="pizzaname"
                  placeholder="Név módosítása"
                ></input>
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
                  id="keplink"
                  placeholder="Kép módosítása"
                ></input>
                <button type="button" class="btn btn-primary">
                  Módosít
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
