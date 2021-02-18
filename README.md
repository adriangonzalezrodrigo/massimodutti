# Antes de empezar:
- Para reportar tu trabajo debes crear un repositorio GIT público.

- Crea tantos commits como consideres necesario. Parte de nuestra evaluación se basa en como afrontas los problemas y la única forma que tenemos de verlo es mediante commits. Esta parte puede ser más decisiva que la calidad de la entrega.
- En el comentario del commit especifica los cambios que has realizado, así como explicaciones o aportaciones que consideres importante comentar. Valoraremos especialmente que los commits estén bien documentados
- En caso de que surjan dudas intenta buscar alternativas y justifícalas en el mensaje de commit.

# Tasks.

1.  RE-Estructura el proyecto como mejor consideres. 
    1.  Como mínimo se debe crear un modulo a parte para la autenticación y registro.
    2.  Implementa Interficies  o clases  para los tipos de datos que consideres.
2. Implementa un sistema de login/registro que persista los datos correctamente.
   1. Puedes utilizar:
      1. LocalStorage, 
      2. Alguna api externa
      3. Implementar servicio propio con Nodejs.
3. Implementa el patron de diseño redux para la gestion del listado de naves.
   1. No es necesario implementar redux para todo el aplicativo, solo para la gestión de naves.
4.  Implementa la carga de multiples "páginas" en el apartado de ships.
    1.   Actualmente solo carga una página de la api.
    2.   Revisar la API para saber como consumir el resto de páginas. https://swapi.dev/
5.  Implementa test unitarios para el modulo de login/registro.
6.  Añade imágenes a las CARDS de naves: Puedes usar esta api  'https://starwars-visualguide.com/assets/img/starships/' + ID_DE NAVE -->  https://starwars-visualguide.com/assets/img/starships/5.jpg
7.  Suponiendo que esta página tiene un numero elevado de usuarios simultáneos, implementa las mejoras que consideres oportunas para evitar la saturación del servidor.
    1.  Si alguna de las medidas no es de código, comentalas a continuación en este Readme.


# Getting Started 

`npm i`  for install
Run `npm run start` for a dev server. 
Navigate to `http://localhost:4200/`.


# Notas del desarrollador:
La aplicación está estructurada en tres partes: 
1. modules: haría referencia a secciones/pantalla de la aplicación para dividir la lógica de la misma. Puede contener tamibén módulos comúnes (commons) que se requieran en varias partes de la aplicación y que se carguen de manera lazy a medida que se necesiten. Todos los módulos están en lazy load, quizás podría cargarse directamente el login ya que primero se entraría por él.
2. shared: haría referencia a todo lo compartido por la aplicación a nivel global, aquí añadiría los componentes para el shell de la aplicación, servicios, modelos, utilidades, etc...
3. store: control del estado de la aplicación

En la aplicación, como es lógico, faltan muchas partes, interceptores, configuración de precommits, pushs con husky, etc...

Para el login y registro he usado Firebase, aunque pida introducir nombre y usuario, lo realmente necesario es el email y la password. No he comprobado que se tenga el email verificado porque para el caso de uso que es no lo considero necesario. La configuración para firebase hay que introducirla en el fichero de environment.

En cuanto a las mejoras en caso de tener un gran número simultáneo de usuarios, lo que haría sería tener desplegados las aplicaciones en sistemas que puedan escalar. Sobretodo a nivel de backend para intentar evitar todo tipo de cuellos de botella como los relaciones con las consultas a la bbdd, peticiones que admita el servidor, etc...

La aplicación está desplegada en https://massimoduttitest2021.netlify.app
