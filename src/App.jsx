import { useEffect, useState } from 'react';
import "./App.css"

function App() {
  // creation des states de PERSONS pour stocker les data et SEARCHPERSON pour chercher une personne
  const [persons, setPersons] = useState([])
  const [searchPerson, setSearchPerson] = useState();

  // method permettant d'aller chercher des data
  async function loadData() {
    const response = await fetch("http://localhost:8080/persons/getAllPersons");

    if (!response.ok) {
      throw new Error("Something bad happen !!")
    }
    const data = await response.json();
    setPersons(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  // filter les data persons par la recherche du input
  const personFilter = persons.filter( p => 
    p.prenom.startsWith(searchPerson) || 
    p.nom.startsWith(searchPerson) ||
    p.email.startsWith(searchPerson) ||
    p.genre.startsWith(searchPerson)
  )
  
  console.log(personFilter)

  return (
    <div className='container'>
      <h1>Recherche dans la base de personnes</h1>

      <input
        type="text"
        // stocker les élément pour cherche
        onChange={(e) => setSearchPerson(e.target.value)}
        placeholder="Ex: PHI"
        style={{ padding: '0.5rem', width: '300px', fontSize: '1rem' }}
      />

      <table  className='tableau' border="1" cellPadding="5" style={{ marginTop: '1rem'}}>
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
          {
            // si le personFilter est vide afficher la liste de persons
            personFilter.length == 0 ?  
            persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.nom}</td>
                <td>{person["prenom"]}</td>
                <td>{person["email"]}</td>
                <td>{person["genre"]}</td>

              </tr>
            ))

            :

            personFilter.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.nom}</td>
                <td>{person["prenom"]}</td>
                <td>{person["email"]}</td>
                <td>{person["genre"]}</td>
              </tr>
            ))

          }

        </tbody>
      </table>
    </div>
  );
}

export default App;