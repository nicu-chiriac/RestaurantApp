# Flask REST API Backend


## Flask REST API installation steps

In folderul de Backend ruleaza :

### `pip install -r requirements.txt`

Toate dependentele proiectului se vor instala automat

### `Trebuie modificate in fisierul .env urmatoarele :`

- host, user, password si database

### `Pentru a crea automat tabelele :`

- 1) python  (pentru a deschide un terminal python)

- 2) from flaskrestaurantapp import app, db

- 3) app.app_context().push()

- 4) db.create_all()

#### Pentru a rula aplicatia : python -m flask run



