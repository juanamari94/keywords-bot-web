# keywords-bot-web
Aplicación web para la administración de palabras clave del bot KeywordsBot para grupos de la aplicación de chat [Telegram](http://telegram.org). Trabajo práctico de la materia Arquitectura Web.

# Integrantes
- Juan Amari, Legajo 76122

## Descripción
Consiste en la parte web del bot desarrollado para la aplicación de Telegram MemoryBot. MemoryBot es un softbot que se desarrollará en Python y que tiene como objetivo ser utilizado en grupos y por usuarios individuales donde se le agregarán palabras clave pertenecientes al grupo y contestará con el valor asignado mediante esta interfaz web.

La necesidad de esta aplicación surge de la poca interactividad disponible en el intercambio de mensajes de texto del chat, ya que pueden haber cientos de palabras clave y administrarlas dentro de un grupo no solamente generaría spam en este sino también una mala experiencia de usuario en la administración de éstas.

### Detalles sobre MemoryBot
Softbot desarrollado en Python siguiendo los lineamientos de la API de Telegram para la creación de bots. Busca ayudar a los usuarios habituales la aplicación de chat [Telegram](http://telegram.org) recordandoles mediante palabras clave palabras u oraciones que ellos hayan determinado previamente. Un ejemplo muy simple es poner recordatorios, tales como la dirección de la oficina en un grupo de trabajo, el número de teléfono de un vendedor, una URL muy usada, etcétera.

En funcionamiento, un usuario podría por ejemplo enviar en el grupo del chat ´!direccion´ y el bot responderá con el resultado del mapeo previo de esa clave.

### Detalles sobre la aplicación web
Se podrán dar de alta varias palabras clave que lleven a un mismo valor, como tambièn borrar y modificarlas. Para permitir esta alta, baja y modificación se presentarán en una lista que se almacenará en una base de datos no-relacional.

Por una cuestión de seguridad la URL que presentará el bot poseerá un token aleatorio asignado específicamente a ese grupo para minimizar la ventana de oportunidad en la que usuarios que no pertenezcan al grupo puedan modificar las palabras clave. Otro mecanismo (bypasseable) de seguridad será incluir el Chat ID (Group ID) de Telegram como parámetro de la URL, la cual un usuario normal no puede determinar fácilmente.

El mapeo `token -> Group Id` está almacenado en Redis.

# Endpoints

**Authorization header obligatorio con una API_KEY token para validar al consumidor de la API. Solamente el bot posee la API KEY.**

**Todos los endpoints /api/token validan que la API KEY (api_key) sea válida. Solamente el bot puede consumir estos endpoints. De no validarse retorna un Error 401.**

`GET /api/token/:group_id` ->  Valida que quien desea acceder pertenezca al grupo en cuestión. Entrega una vista de todas las palabras y claves 
pertenecientes al grupo.


`POST /api/token` -> Crea un nuevo token para un grupo o chat. Debe recibir un JSON con un mapeo `{'group_id': 'valor'}`. Si el grupo no existía anteriormente, lo crea y persiste en la base de datos con un nuevo token.

Content-Type: Application/JSON


`PUT /api/token/:group_id` -> Actualiza un token clave-valor para un cierto grupo `group_id`.

Content-Type: Application/JSON


`DELETE /keys/{id}` -> Borra un mapeo clave-valor de un cierto grupo.

------

**Los siguientes endpoints son consumidos por el front-end en Angular 5. Por problemas problemas con CORS entre otras cosas se decidió enviar el token como un parámetro más de la URL.**

**Todas las API calls validan el token que se envía antes de realizar su funcionalidad.**

GET `/api/keywords/:group_id/:token` -> Busca y retorna el mapa de palabras clave -> valor para un grupo.

POST `/api/keywords/:group_id/:token` -> Crea un mapa palabras clave -> valor de no existir con la entrada enviada a través del body, el cual es validado. De ya existir el mapa, simplemente agrega a éste la entrada. Si ya existe el mapeo que intenta agregar retorna un Error 403. El body debe ser de la forma:

```javascript
{
    keyword: 'keyword value',
    value: 'value'
}
```

GET `/api/keywords/:group_id/:token/:keyword` -> Busca un mapeo clave-valor específico para un grupo en particular. Este endpoint lo consume únicamente el bot.

PUT `/api/keywords/:group_id/:token` -> Modifica un mapeo clave-valor para un grupo, específicamente el valor de esta entrada. De no encontrar ese mapeo deuvuelve un Error 404. Recibe un JSON en el body con la siguiente forma:

```javascript
{
    keyword: 'keyword value',
    value: 'value'
}
```

`/api/keywords/:group_id/:token/:keyword` -> Borra un mapeo clave-valor para el grupo dado. Si no encuentra el mapeo devuelve un Error 404.