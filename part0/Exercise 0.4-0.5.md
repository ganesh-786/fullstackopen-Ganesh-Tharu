## Exercises: 0.4-0.6

#### 0.4) When user creates a new note:

The following sequence diagram illustrates the end‑to‑end flow when a user enters a note and clicks **Save**, showing how the browser and the server interact to render and persist the data.

```mermaid
sequenceDiagram
    participant user as **User**
    participant browser as **Browser**
    participant server as **Server**

    user->>browser: Enter note text and click **Save**
    activate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Returns updated HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Returns CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Returns JavaScript file
    deactivate server

    Note right of browser: Browser executes fetched JS, which then:

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Returns notes as JSON
    deactivate server

    Note right of browser: JS callback re‑renders the notes list

    browser-->>user: Displays the updated notes
    deactivate browser
```

<hr>

#### 0.5) When user goes to single page app version of the notes app:

This sequence diagram shows how a Single‑Page Application (SPA) is loaded and initialized when the user navigates to the app URL.

```mermaid
sequenceDiagram
    participant user as **User**
    participant browser as **Browser**
    participant server as **Server**

    user->>browser: Enter SPA URL and hit **Enter**
    activate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Returns SPA HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Returns CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: Returns SPA JavaScript bundle
    deactivate server

    Note right of browser: Browser executes SPA JavaScript, which then:

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Returns data as JSON
    deactivate server

    Note right of browser: JS callback renders the notes view within the SPA

    browser-->>user: Displays the SPA with rendered notes
    deactivate browser
```

<hr>

#### 0.6) When the user creates a new note in the single page app:

The following sequence diagram illustrates what happens when a user adds a new note and presses **Enter** in the Single‑Page Application (SPA).

```mermaid
sequenceDiagram
    participant user as **User**
    participant browser as **Browser**
    participant server as **Server**

    user->>browser: Enter a new note and press **Enter**
    activate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa <br/>+ request payload
    activate server
    server-->>browser: Response: `"message created"`
    deactivate server

    browser-->>browser: SPA JS logic creates a new note object
    browser-->>browser: Re-renders the notes list with the new entry

    browser->>user: Displays updated notes with the new entry
    deactivate browser

    Note right of browser: All operations are handled dynamically via JavaScript in the SPA
```
