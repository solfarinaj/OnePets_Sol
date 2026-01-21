-- Crear un usuario de prueba (esto es más complejo, usualmente se hace desde el cliente o un script)
-- Por ahora, nos enfocaremos en datos que no dependen de la autenticación

-- Insertar productos de prueba
INSERT INTO public.products (name, description, price, stock_quantity, species, category, is_essential, is_subscription_eligible, in_stock, weight_kg) VALUES
('Alimento Premium para Perro Adulto', 'Saco de 15kg de alimento balanceado para perros adultos de raza mediana a grande.', 45000.00, 100, 'dog', 'food', TRUE, TRUE, TRUE, 15.0),
('Arena Sanitaria para Gato Aglomerante', 'Arena aglomerante de alta calidad, control de olores, bolsa de 10kg.', 12000.00, 200, 'cat', 'litter', TRUE, FALSE, TRUE, 10.0),
('Snacks Dentales para Perro Pequeño', 'Bolsa de snacks para la higiene dental de perros pequeños, sabor menta.', 8500.00, 150, 'dog', 'treats', FALSE, FALSE, TRUE, 0.2),
('Juguete Interactivo para Gato', 'Juguete con plumas y láser para estimular el juego en gatos indoor.', 7500.00, 50, 'cat', 'toys', FALSE, FALSE, TRUE, 0.1),
('Champú Hipoalergénico para Perros', 'Champú suave para perros con piel sensible, 500ml.', 9800.00, 75, 'dog', 'hygiene', FALSE, FALSE, TRUE, 0.5);
