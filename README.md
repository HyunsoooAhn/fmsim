## Build


```
# install node_modules
$ yarn install
# data migration in development mode
$ yarn run migration --mode=development
# run application (fmsim) in development mode
$ DEBUG=things-factory:* yarn run serve:dev
```

```
# data migration in production mode
$ yarn run migration --mode=production
# build application (server module)
$ yarn build
# build application (client module)
$ yarn build:client
# run application (fmsim) in production mode
$ yarn run serve
```

# Browser Client

- URL : http://localhost:3000
- default user and password : admin@hatiolab.com / admin

## install

- fmsim installation script

  - create a folder for the application and change directory to your folder.
  - the script will download a& install fmsim

    ```
    # install script for fmsim
    cd
    ```

  - run 'start.sh' to start fmsim and 'stop.sh' to stop the running applicaton.
  - on initial start, run 'migrate.sh' first to migrate database.

  ```
  # data migration
  $ ./start.sh
  $ ./migrate.sh
  $ ./stop.sh

  # restart with service port no. defualt uses 4000
  $ ./start.sh 80
  ```