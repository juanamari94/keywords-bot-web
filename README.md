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
Poseerá una landing page invitando al usuario a instalarse Telegram y a hacer uso de MemoryBot para recordatorios del tamaño que uno desee. Su mayor uso vendrá de Telegram mismo, donde el bot presentará una URL a un recurso de la aplicación web donde el usuario podrá administrar sus palabras clave, o dicho de otra forma la memoria del Bot respecto a su grupo o persona.

Se podrán dar de alta varias palabras clave que lleven a un mismo valor, como tambièn borrar y modificarlas. Para permitir esta alta, baja y modificación se presentarán en una lista paginada que se almacenará en una base de datos no-relacional.

Por una cuestión de seguridad la URL que presentará el bot poseerá un token aleatorio asignado específicamente a ese grupo para minimizar la ventana de oportunidad en la que usuarios que no pertenezcan al grupo puedan modificar las palabras clave. Otro mecanismo (bypasseable) de seguridad será incluir el User ID de Telegram como parámetro de la URL, la cual un usuario normal no puede determinar fácilmente.

# Endpoints

`GET /` -> Una landing page del bot y qué hace.

**Authorization header obligatorio con un token para validar el usuario para los siguientes endpoints.**

`GET /keys` ->  Valida que quien desea acceder pertenezca al grupo en cuestión. Entrega una vista de todas las palabras y claves 
pertenecientes al grupo.


`POST /keys` -> Agrega un mapeo clave-valor a un cierto grupo.

Content-Type: Application/JSON


`PUT /keys/{id}` -> Actualiza un mapeo clave-valor de un cierto grupo.

Content-Type: Application/JSON


`DELETE /keys/{id}` -> Borra un mapeo clave-valor de un cierto grupo.
