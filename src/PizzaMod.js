import { useState, useEffect } from "react";

export function PizzaMod() {
  const [pizzak, setpizzak] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://pizza.kando-dev.eu/Pizza", { credentials: "include" })
      .then((res) => res.json())
      .then((pizzak) => setInstruments(pizzak))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);
  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Pizzak</h2>
          {pizzak.map((pizzak) => (
            <div className="card col-sm-3 d-inline-block m-1 p-2">
              <h6 className="text-muted">{pizzak.name}</h6>
              <h5 className="text-muted">
                Ez Gluténmentes: {pizzak.isGlutenFree ? "Igen" : "Nem"}
              </h5>
              <div className="card-body">
                <img
                  className="img-fluid"
                  style={{ maxHeight: 200 }}
                  src={pizzak.imageURL ? pizzak.imageURL : ""}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
