openapi: 3.0.0
info:
  title: OnePets API
  version: 1.0.0
  description: >
    API para el MVP de OnePets: gestión de cuentas de usuario, perfiles de mascotas,
    catálogo de productos esenciales, carrito de compras, pedidos y suscripciones
    de alimento recurrente en zona piloto.

servers:
  - url: http://localhost:3000
    description: Development
  - url: https://staging.onepets.com
    description: Staging
  - url: https://api.onepets.com
    description: Production

paths:
  /api/auth/register:
    post:
      summary: Registrar nuevo usuario
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
            example:
              email: "carla@example.com"
              password: "SuperSegura123"
              fullName: "Carla Rivas"
      responses:
        '201':
          description: Usuario creado correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthSuccessResponse'
        '400':
          description: Error de validación o email ya registrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/auth/login:
    post:
      summary: Iniciar sesión de usuario
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
            example:
              email: "carla@example.com"
              password: "SuperSegura123"
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthSuccessResponse'
        '400':
          description: Credenciales inválidas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/users/me:
    get:
      summary: Obtener perfil del usuario autenticado
      tags: [Users]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Perfil del usuario actual
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfileResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/pets:
    get:
      summary: Listar mascotas del usuario autenticado
      tags: [Pets]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de mascotas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PetListResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    post:
      summary: Crear una nueva mascota
      tags: [Pets]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PetCreateRequest'
            example:
              name: "Rocky"
              species: "dog"
              breed: "mestizo"
              ageYears: 3
              weightKg: 18
              size: "medium"
      responses:
        '201':
          description: Mascota creada correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PetResponse'
        '400':
          description: Error de validación
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/pets/{petId}:
    get:
      summary: Obtener detalle de una mascota
      tags: [Pets]
      security:
        - bearerAuth: []
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalle de la mascota
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PetResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Mascota no encontrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    put:
      summary: Actualizar una mascota
      tags: [Pets]
      security:
        - bearerAuth: []
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PetUpdateRequest'
      responses:
        '200':
          description: Mascota actualizada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PetResponse'
        '400':
          description: Error de validación
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Mascota no encontrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    delete:
      summary: Eliminar una mascota
      tags: [Pets]
      security:
        - bearerAuth: []
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: Mascota eliminada
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Mascota no encontrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/products:
    get:
      summary: Listar productos esenciales
      tags: [Products]
      parameters:
        - name: species
          in: query
          schema:
            type: string
            enum: [dog, cat]
        - name: category
          in: query
          schema:
            type: string
            description: >
              Categoría funcional (e.g., food, litter, hygiene)
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: pageSize
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Lista paginada de productos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductListResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/products/{productId}:
    get:
      summary: Obtener detalle de un producto
      tags: [Products]
      parameters:
        - name: productId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalle del producto
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductResponse'
        '404':
          description: Producto no encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/cart:
    get:
      summary: Obtener carrito actual del usuario
      tags: [Cart]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Carrito actual
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CartResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    put:
      summary: Reemplazar el contenido del carrito
      tags: [Cart]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CartUpdateRequest'
            example:
              items:
                - productId: "c7f9a39c-6e3c-4e3d-8ab4-40b91c4b9e10"
                  quantity: 1
                - productId: "f1d9bb9b-8bde-4c2a-9a4f-82a9c91ade77"
                  quantity: 2
      responses:
        '200':
          description: Carrito actualizado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CartResponse'
        '400':
          description: Error de validación (producto inexistente, cantidad inválida, etc.)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/orders:
    post:
      summary: Crear un nuevo pedido desde el carrito
      tags: [Orders]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderCreateRequest'
            example:
              deliveryMethod: "home_delivery"
              deliveryAddressId: "a2b4f7e1-11c3-4e38-9e5c-a4c6ab51e904"
              paymentMethodId: "pm_123456"
      responses:
        '201':
          description: Pedido creado correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'
        '400':
          description: Error de validación (carrito vacío, dirección fuera de zona, etc.)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    get:
      summary: Listar pedidos del usuario autenticado
      tags: [Orders]
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [pending, preparing, out_for_delivery, delivered, cancelled]
      responses:
        '200':
          description: Lista de pedidos del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderListResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/orders/{orderId}:
    get:
      summary: Obtener detalle de un pedido
      tags: [Orders]
      security:
        - bearerAuth: []
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalle del pedido
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Pedido no encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/subscriptions:
    get:
      summary: Listar suscripciones activas del usuario
      tags: [Subscriptions]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de suscripciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SubscriptionListResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
    post:
      summary: Crear una suscripción de alimento
      tags: [Subscriptions]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubscriptionCreateRequest'
            example:
              productId: "c7f9a39c-6e3c-4e3d-8ab4-40b91c4b9e10"
              petId: "b41637a3-7d6a-4b94-b63e-bbccf53bdc0f"
              frequencyWeeks: 4
      responses:
        '201':
          description: Suscripción creada correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SubscriptionResponse'
        '400':
          description: Error de validación (producto no elegible, frecuencia inválida, etc.)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /api/subscriptions/{subscriptionId}:
    patch:
      summary: Actualizar una suscripción existente
      tags: [Subscriptions]
      security:
        - bearerAuth: []
      parameters:
        - name: subscriptionId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubscriptionUpdateRequest'
            example:
              frequencyWeeks: 6
              status: "paused"
      responses:
        '200':
          description: Suscripción actualizada correctamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SubscriptionResponse'
        '400':
          description: Error de validación
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: No autenticado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: Suscripción no encontrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: Error interno del servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    RegisterRequest:
      type: object
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 8
        fullName:
          type: string
          minLength: 2
      required:
        - email
        - password
        - fullName

    LoginRequest:
      type: object
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 8
      required:
        - email
        - password

    AuthSuccessResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        token:
          type: string
          description: JWT de autenticación
        user:
          $ref: '#/components/schemas/User'
      required:
        - success
        - token
        - user

    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        fullName:
          type: string
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - email
        - fullName
        - createdAt

    UserProfileResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        user:
          $ref: '#/components/schemas/User'
      required:
        - success
        - user

    Pet:
      type: object
      properties:
        id:
          type: string
          format: uuid
        ownerId:
          type: string
          format: uuid
        name:
          type: string
        species:
          type: string
          enum: [dog, cat]
        breed:
          type: string
          nullable: true
        ageYears:
          type: integer
          minimum: 0
        weightKg:
          type: number
          format: float
          minimum: 0
        size:
          type: string
          enum: [small, medium, large]
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - ownerId
        - name
        - species
        - ageYears
        - weightKg
        - size
        - createdAt

    PetCreateRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 1
        species:
          type: string
          enum: [dog, cat]
        breed:
          type: string
          nullable: true
        ageYears:
          type: integer
          minimum: 0
        weightKg:
          type: number
          format: float
          minimum: 0
        size:
          type: string
          enum: [small, medium, large]
      required:
        - name
        - species
        - ageYears
        - weightKg
        - size

    PetUpdateRequest:
      allOf:
        - $ref: '#/components/schemas/PetCreateRequest'

    PetResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        pet:
          $ref: '#/components/schemas/Pet'
      required:
        - success
        - pet

    PetListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        pets:
          type: array
          items:
            $ref: '#/components/schemas/Pet'
      required:
        - success
        - pets

    Product:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        species:
          type: string
          enum: [dog, cat]
        category:
          type: string
          description: e.g., food, litter, hygiene
        description:
          type: string
        price:
          type: number
          format: float
          minimum: 0
        currency:
          type: string
          example: "CLP"
        weightKg:
          type: number
          format: float
          minimum: 0
        isEssential:
          type: boolean
        isSubscriptionEligible:
          type: boolean
        inStock:
          type: boolean
      required:
        - id
        - name
        - species
        - category
        - price
        - currency
        - isEssential
        - isSubscriptionEligible
        - inStock

    ProductListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        items:
          type: array
          items:
            $ref: '#/components/schemas/Product'
        page:
          type: integer
        pageSize:
          type: integer
        totalItems:
          type: integer
      required:
        - success
        - items
        - page
        - pageSize
        - totalItems

    ProductResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        product:
          $ref: '#/components/schemas/Product'
      required:
        - success
        - product

    CartItem:
      type: object
      properties:
        productId:
          type: string
          format: uuid
        quantity:
          type: integer
          minimum: 1
        unitPrice:
          type: number
          format: float
          minimum: 0
        lineTotal:
          type: number
          format: float
          minimum: 0
      required:
        - productId
        - quantity
        - unitPrice
        - lineTotal

    Cart:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: '#/components/schemas/CartItem'
        subtotal:
          type: number
          format: float
        shippingCost:
          type: number
          format: float
        total:
          type: number
          format: float
        currency:
          type: string
      required:
        - id
        - userId
        - items
        - subtotal
        - shippingCost
        - total
        - currency

    CartResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        cart:
          $ref: '#/components/schemas/Cart'
      required:
        - success
        - cart

    CartUpdateRequest:
      type: object
      properties:
        items:
          type: array
          items:
            type: object
            properties:
              productId:
                type: string
                format: uuid
              quantity:
                type: integer
                minimum: 0
            required:
              - productId
              - quantity
      required:
        - items

    Address:
      type: object
      properties:
        id:
          type: string
          format: uuid
        line1:
          type: string
        line2:
          type: string
          nullable: true
        city:
          type: string
        region:
          type: string
        postalCode:
          type: string
        country:
          type: string
          example: "CL"
        withinPilotZone:
          type: boolean
      required:
        - id
        - line1
        - city
        - region
        - postalCode
        - country
        - withinPilotZone

    Order:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending, preparing, out_for_delivery, delivered, cancelled]
        items:
          type: array
          items:
            $ref: '#/components/schemas/CartItem'
        deliveryMethod:
          type: string
          enum: [home_delivery, pickup]
        deliveryAddress:
          $ref: '#/components/schemas/Address'
        subtotal:
          type: number
          format: float
        shippingCost:
          type: number
          format: float
        total:
          type: number
          format: float
        currency:
          type: string
        estimatedDeliveryWindow:
          type: string
          description: Texto descriptivo de ventana de entrega
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - userId
        - status
        - items
        - deliveryMethod
        - subtotal
        - shippingCost
        - total
        - currency
        - createdAt

    OrderCreateRequest:
      type: object
      properties:
        deliveryMethod:
          type: string
          enum: [home_delivery, pickup]
        deliveryAddressId:
          type: string
          format: uuid
          nullable: true
        paymentMethodId:
          type: string
          description: Identificador interno del método de pago/token
      required:
        - deliveryMethod
        - paymentMethodId

    OrderResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        order:
          $ref: '#/components/schemas/Order'
      required:
        - success
        - order

    OrderListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        orders:
          type: array
          items:
            $ref: '#/components/schemas/Order'
      required:
        - success
        - orders

    Subscription:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        productId:
          type: string
          format: uuid
        petId:
          type: string
          format: uuid
        frequencyWeeks:
          type: integer
          minimum: 1
        status:
          type: string
          enum: [active, paused, cancelled]
        nextDeliveryDate:
          type: string
          format: date
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - userId
        - productId
        - petId
        - frequencyWeeks
        - status
        - createdAt

    SubscriptionCreateRequest:
      type: object
      properties:
        productId:
          type: string
          format: uuid
        petId:
          type: string
          format: uuid
        frequencyWeeks:
          type: integer
          minimum: 1
      required:
        - productId
        - petId
        - frequencyWeeks

    SubscriptionUpdateRequest:
      type: object
      properties:
        frequencyWeeks:
          type: integer
          minimum: 1
        status:
          type: string
          enum: [active, paused, cancelled]

    SubscriptionResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        subscription:
          $ref: '#/components/schemas/Subscription'
      required:
        - success
        - subscription

    SubscriptionListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        subscriptions:
          type: array
          items:
            $ref: '#/components/schemas/Subscription'
      required:
        - success
        - subscriptions

    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          properties:
            code:
              type: string
              description: Código de error interno
            message:
              type: string
              description: Mensaje legible para el usuario/desarrollador
            details:
              type: object
              additionalProperties: true
              nullable: true
      required:
        - success
        - error
