import { useState } from "react";
import "./Input.css";
import Lupa from "./img/search-normal.png";

function Input() {
  const [value, setValue] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("")

  async function addCard() {
    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=959fbc882edd4522b59134540213007&q=${value}`
      );
      const resJSON = await response.json();

      if (!resJSON.location) {
        throw new Error(resJSON.error.message);
      }

      setCards([...cards, resJSON]);
      setError("")
      setValue("");
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="input">
      <h1>Weather</h1>
      <input
        value={value}
        placeholder={"Search for a city"}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      ></input>
      <img className="lupa" src={Lupa} onClick={addCard} />
      <p>{error}</p>

      {cards.map((i) => {
        return (
          <div className={`blocks ${i.current.is_day ? "day" : "night"}`}>
            <div className="block-in">
              <div className="left-side">
                <div className="name">{i.location.name}</div>
                <div className="region">{i.location.region}</div>
                <div className="localtime">{i.location.localtime}</div>
              </div>
              <div className="right-side">
                <img src={i.current.condition.icon} className="icon" />
                <div className="temp-c">{i.current.temp_c}ºC</div>
                <div className="temp-f">{i.current.temp_f}ºF</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Input;
