import { useEffect, useState } from 'react';
import { loadDatabaseFromCSV } from './db';
import { searchPeople } from './utils/search';

function App() {
  // const [rows, setRows] = useState([]);
  // const [query, setQuery] = useState('');
  // const [db, setDb] = useState(null);

  // useEffect(() => {
  //   const load = async () => {
  //     const database = await loadDatabaseFromCSV('/data/people.csv');
  //     setDb(database);
  //     const res = database.exec('SELECT * FROM people');
  //     if (res.length > 0) {
  //       setRows(res[0].values);
  //     }
  //   };
  //   load();
  // }, []);

  const handleSearch = (e) => {
    const input = e.target.value;
  };

  const [persons, setPersons] = useState([])
  const [test, setTest] = useState([1,2,3,4,4])

  async function loadData() {
    const response = await fetch("http://localhost:8080/persons/getAllPersons");

    if (!response.ok) {
      throw new Error("Something bad happen !!")
    }
    const data = await response.json();
    setPersons(data)
    console.log(data)
  }


  // console.log(persons);
  

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recherche dans la base de personnes</h1>

      <input
        type="text"
        // value={query}
        // onChange={handleSearch}
        placeholder="Ex: PHI"
        style={{ padding: '0.5rem', width: '300px', fontSize: '1rem' }}
      />

      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.nom}</td>
              {/* <td>{person.p}</td> */}
              {/* <td>{person}</td>
              <td>{email}</td>
              <td>{genre}</td> */}
              {/* <td>{person.genre}</td> */}

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
