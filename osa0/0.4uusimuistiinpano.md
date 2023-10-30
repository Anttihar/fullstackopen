```mermaid
sequenceDiagram
    participant S as Selain
    participant P as Palvelin
    S->>+P: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    P-->>-S: Uudellenohjauspyyntö /exampleapp/notes
    S->>+P: GET https://studies.cs.helsinki.fi/exampleapp/notes
    P-->>-S: HTML documentti
    S->>+P: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    P-->>-S: CSS tiedosto
    S->>+P: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    P-->>-S: JavaScript tiedosto<br/>Selain alkaa suorittaa koodia joka pyytää hakemaan JSON tiedoston palvelimelta
    S->>+P: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    P-->>-S: JSON tiedosto<br/>Selain suorittaa callback -funktion joka renderöi datan
```
