# LpaExample

El proposito de este mini-proyecto es obtener acceso al visor para visualizar una imagen/documento, para esto utiliza el metodo que brinda el Visor para estos casos (metodo POST en EntryServlet del proyecto del Visor). A este metodo hay que pasarle la URL donde esta publicada la imagen/documento, el Token de acceso en el Header, etc. Si el servicio da 200 OK retorna la URL del visor donde podremos visualizar la imagen/documento.

## Nota

Para "simular" la publicacion de la imagen en el navegador, y pasarsela al Visor debemos contar con la URL del servicio (Visor-UrlProvider), el cual se encarga de publicar la imagen en el navegador. Con la imagen ya disponible en el navegador podemos llamar a la URL expuesta por el Visor. La url del mini-proyecto encargado de publicar el Visor-UrlProvider esta en la variable getImageUrl = "http://localhost:8081/images/" (en este proyecto)

