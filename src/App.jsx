import { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");
    setResponse(null);

    try {

      const apiResponse = await fetch(
        "http://localhost:8081/api/v1/voting/vote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            age: Number(age)
          })
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Unable to process voting request");
      }

      const data = await apiResponse.json();

      console.log("Response from Spring Boot:", data);

      setResponse(data);

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>Voting Eligibility</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
            />

          </div>

          <div className="form-row">

            <label>Age</label>

            <input
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              placeholder="Enter your age"
              required
            />

          </div>

          <button type="submit" disabled={loading}>

            {loading ? "Checking..." : "Check Eligibility"}

          </button>

        </form>

        {response && (

          <div className="response">

            <h2>Result</h2>

            <p>
              <strong>Name:</strong> {response.name}
            </p>

            <p>
              <strong>Age:</strong> {response.age}
            </p>

            <p>
              <strong>Status:</strong> {response.status}
            </p>

          </div>

        )}

        {error && (

          <div className="error">

            <strong>Error:</strong> {error}

          </div>

        )}

      </div>

    </div>
  );
}

export default App;