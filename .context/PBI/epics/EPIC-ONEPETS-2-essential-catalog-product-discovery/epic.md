## Epic Description                                                     
                                                                          
  Catalogo reducido de esenciales (alimento, arena, basicos de higiene)   
  optimizado para mobile, con navegacion clara por especie y categoria.   
  Incluye ficha de producto con datos clave, disponibilidad por direccion 
  dentro de la zona piloto y opcion de marcar favoritos para recompra     
  rapida. Busca minimizar friccion en la busqueda y discovery inicial,    
  habilitando conversion rapida hacia carrito y checkout.                 
                                                                          
  Business Value:                                                         
  Incrementa conversion al reducir pasos para encontrar productos         
  adecuados por mascota, mejora exactitud de disponibilidad para evitar   
  cancelaciones por falta de stock en la zona piloto y habilita           
  recurrencia mediante favoritos. Es la base para la propuesta de valor de
  reposicion rapida y para posteriores suscripciones de alimento.         
                                                                          
  ———                                                                     
                                                                          
  ## User Stories                                                         
                                                                          
  1. ONEPETS-TBD - As a pet owner, I want to browse essential products by 
     species so that I quickly find what fits my pet.                     
  2. ONEPETS-TBD - As a pet owner, I want to filter products by category  
     so that I narrow results to what I need.                             
  3. ONEPETS-TBD - As a pet owner, I want to view key product details so  
     that I can decide if it is suitable.                                 
  4. ONEPETS-TBD - As a pet owner, I want to see product availability for 
     my address so that I know if fast delivery applies.                  
  5. ONEPETS-TBD - As a pet owner, I want to mark products as favorites so
     that I can reorder them faster.                                      
                                                                          
  NOTA: Los IDs se actualizaran con las stories reales creadas en Jira.   
                                                                          
  ———                                                                     
                                                                          
  ## Scope                                                                
                                                                          
  ### In Scope                                                            
                                                                          
  - Catalogo esencial (~20 SKUs) filtrable por especie (perro/gato) y     
    categoria (food, litter, hygiene).                                    
  - Paginas de listado con paginacion basica y ordenamiento por           
    relevancia.                                                           
  - Ficha de producto con datos clave: presentacion, peso, especie/       
    categoria, elegibilidad para suscripcion, stock visible.              
  - Indicador de disponibilidad segun direccion guardada del usuario (zona    piloto) y manejo de caso sin direccion.                               
  - Favoritos (agregar/remover, vista de favoritos basica).               
  - Mensajes claros ante falta de stock o producto inactivo.              
                                                                          
  ### Out of Scope (Future)                                               
                                                                          
  - Recomendaciones avanzadas o motor ML.                                 
  - Busqueda semantica o full-text avanzada.                              
  - Soporte para especies adicionales o catalogos masivos (multi-ciudad). 
  - Bundles, cross-sell automatizado o promociones complejas.             
                                                                          
  ———                                                                     
                                                                          
  ## Acceptance Criteria (Epic Level)                                     
                                                                          
  1. Listado de productos esenciales muestra solo SKUs activos marcados   
     como isEssential, con respuesta <= 2s en condiciones nominales.      
  2. Filtros por especie y categoria aplican combinaciones validas y      
     mantienen paginacion consistente.                                    
  3. Ficha de producto expone datos clave y retorna 404 para IDs          
     inexistentes o inactivos.                                            
  4. Disponibilidad por direccion refleja zona piloto; si no hay direccion     o esta fuera de zona, se muestra mensaje claro y CTA alternativo (ej.     configurar direccion).                                               
  5. Favoritos requieren usuario autenticado, evitan duplicados y         
     persisten entre sesiones.                                            
  6. Errores de disponibilidad o stock se comunican antes de agregar al   
     carrito para evitar cancelaciones posteriores.                       
  7. UX responsive en mobile con navegacion simple (<= 3 taps desde home a     ficha de producto relevante).                                        
                                                                          
  ———                                                                     
                                                                          
  ## Related Functional Requirements                                      
                                                                          
  - FR-005: Listado de catalogo por especie.                              
  - FR-006: Filtros por tipo de producto.                                 
  - FR-007: Visualizacion de informacion clave del producto.              
  - FR-008: Indicacion de disponibilidad segun zona.                      
  - FR-009: Marcado y gestion de productos favoritos.                     

  Ver: .context/SRS/srs-functional-specs.md                               
                                                                          
  ———                                                                     
                                                                          
  ## Technical Considerations                                             
                                                                          
  ### Frontend & UX                                                       
                                                                          
  - Diseño mobile-first; mantener performance en listado con lazy load de 
    imagenes.                                                             
  - Manejar estados vacios: sin productos filtrados, sin direccion        
    configurada, sin favoritos.                                           
  - CTA claros hacia agregar al carrito y hacia configuracion de          
    direccion.                                                            
                                                                          
  ### Catalog & Filtering                                                 
                                                                          
  - Solo productos con flag isEssential=true y active=true.               
  - Validar enums de species y category desde fuente central de datos para    evitar filtros invalidos.                                             
  - Paginacion y ordenamiento deterministico para evitar saltos al aplicar    filtros.                                                              
                                                                          
  ### Database Schema                                                     
                                                                          
  Tables (referenciales, no hardcodear):                                  
                                                                          
  - products (id, name, species, category, isEssential,                   
    isSubscriptionEligible, active, stock flags).                         
  - product_media (imagenes principales).                                 
  - inventory o equivalente por zona/punto de despacho.                   
  - favorite_products (userId, productId, timestamps).                    
                                                                          
  ### Security Requirements                                               

  - Autenticacion obligatoria para favoritos y direccion de entrega.      
  - Autorizacion: direccion debe pertenecer al usuario para calcular      
    disponibilidad.                                                       
  - Validacion de input de filtros y params (evitar enumeraciones         
    abiertas).                                                            
  - Rate limit basico para endpoints de favoritos y producto individual.  
                                                                          
  ———                                                                     
                                                                          
  ## Dependencies                                                         
                                                                          
  ### External Dependencies                                               
                                                                          
  - Servicio/logica de zonas para determinar withinPilotZone (puede venir 
    de Epic 4 o config interna).                                          
  - CDN o storage para imagenes de productos.                             
                                                                          
  ### Internal Dependencies                                               
                                                                          
  - Epic 1: cuentas y mascotas para personalizar especie y manejar        
    autenticacion.                                                        
  - Epic 4: definicion de zona piloto y direccion seleccionada para       
    disponibilidad.                                                       
  - Epic 3: carrito/checkout consume datos de producto y stock; requiere  
    consistencia.                                                         
                                                                          
  ### Blocks                                                              
                                                                          
  - Bloquea onboarding de carrito si no hay disponibilidad confiable por  
    direccion.                                                            
  - Historico de compras y suscripciones (Epic 5) dependen de ficha/      
    producto consistente.                                                 
                                                                          
  ———                                                                     
                                                                          
  ## Success Metrics                                                      
                                                                          
  ### Functional Metrics                                                  
                                                                          
  - Tiempo de respuesta del listado y ficha <= 2s P95 en zona piloto.     
  - Exactitud de disponibilidad por direccion >= 95 % vs inventario real. 
  - Tasa de error 4xx/5xx en catalogo < 1 % de requests.                  
                                                                          
  ### Business Metrics                                                    
                                                                          
  - Conversion desde vista de producto a agregar al carrito >= 20 % en    
    esenciales.                                                           
  - Favoritos: >= 30 % de usuarios recurrentes con al menos 1 favorito    
    guardado.                                                             
  - Reduccion de cancelaciones por falta de stock a < 2 % (alineado a     
    PRD).                                                                 
                                                                          
  ———                                                                     
                                                                          
  ## Risks & Mitigations                                                  
                                                                          
  | Risk | Impact | Probability | Mitigation |                            
  | --- | --- | --- | --- |                                               
  | Datos de stock desalineados con inventario real | High | Medium |     
  Sincronizacion frecuente y flag active controlado por operaciones;      
  fallback de mensaje de sin stock. |                                     
  | Filtros confusos o poco usados | Medium | Medium | Test de usabilidad,  etiquetas claras por especie/categoria, estado vacio instructivo. |     
  | Calculo incorrecto de disponibilidad por direccion | High | Medium |  
  Validar ownership de direccion, pruebas con casos dentro/fuera de zona, 
  logs para discrepancias. |                                              
  | Latencia alta en mobile por imagenes pesadas | Medium | Medium |      
  Optimizar imagenes (formatos modernos), lazy loading y CDN. |
  | Favoritos sin autenticacion consistente | Medium | Low | Forzar login 
  antes de agregar; manejar expiracion de sesion con mensajes claros. |   
                                                                          
  ———                                                                     
                                                                          
  ## Testing Strategy                                                     
                                                                          
  Ver: .context/PBI/epics/EPIC-ONEPETS-{NUM}-essential-catalog/feature-   
  test-plan.md (Fase 5).                                                  
                                                                          
  ### Test Coverage Requirements                                          
                                                                          
  - Unit Tests: normalizacion de filtros, validacion de enums, formateo de    datos en ficha.                                                       
  - Integration Tests: endpoints de catalogo con combinaciones de especie/    categoria, disponibilidad por direccion.                              
  - E2E Tests: navegacion mobile desde home -> listado -> ficha -> marcar 
    favorito; manejo de caso sin direccion / fuera de zona.               
                                                                          
  ———                                                                     
                                                                          
  ## Implementation Plan                                                  
                                                                          
  Ver: .context/PBI/epics/EPIC-ONEPETS-{NUM}-essential-catalog/feature-   
  implementation-plan.md (Fase 6).                                        
                                                                          
  ### Recommended Story Order                                             
                                                                          
  1. ONEPETS-TBD - Listado esencial por especie y categoria (base).       
  2. ONEPETS-TBD - Ficha de producto con datos clave.                     
  3. ONEPETS-TBD - Disponibilidad por direccion (zona piloto).            
  4. ONEPETS-TBD - Favoritos (add/remove/list).                           
  5. ONEPETS-TBD - Optimizaciones de UX y rendimiento en mobile.          
                                                                          
  ### Estimated Effort                                                    
                                                                          
  - Development: 1.5-2 sprints.                                           
  - Testing: 0.5 sprint.                                                  
  - Total: ~2-2.5 sprints.                                                
                                                                          
  ———                                                                     
                                                                          
  ## Notes                                                                
                                                                          
  - Mantener vocabulario simple en labels y mensajes de error para pet    
    owners.                                                               
  - Priorizar primeras versiones con set limitado de categorias; expandir 
    cuando haya datos de demanda.                                         
                                                                          
  ———                                                                     
                                                                          
  ## Related Documentation                                                
                                                                          
  - PRD: .context/PRD/prd-executive-summary.md, .context/PRD/prd-mvp-     
    scope.md                                                              
  - SRS: .context/SRS/srs-functional-specs.md (FR-005 a FR-009), .context/    SRS/srs-non-functional-specs.md                                       
  - Architecture: .context/SRS/srs-architecture-specs.md                  
  - API Contracts: .context/SRS/srs-api-contracts.md                      
 