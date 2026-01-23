import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';

// Replace with your Supabase project URL and service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Ensure this is set in your .env

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Supabase URL or Service Role Key is missing. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

async function clearDatabase() {
  console.log('Clearing existing data...');
  // Clear tables that have RLS enabled or are referenced by others first
  // order matters due to foreign key constraints
  await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('cart_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('carts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('favorite_products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('subscriptions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('pets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('addresses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Also clear auth.users if possible (requires admin privileges)
  // await supabase.rpc('delete_all_users_from_auth_users'); // You might need a custom function for this in Supabase
  console.log('Database cleared.');
}

async function seedDatabase() {
  await clearDatabase();

  console.log('Seeding products...');
  const products = [];
  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
      species: faker.helpers.arrayElement(['dog', 'cat']),
      category: faker.helpers.arrayElement(['food', 'litter', 'hygiene']),
      image_url: faker.image.urlLoremFlickr({ category: 'animals' }),
      stock_quantity: faker.number.int({ min: 0, max: 100 }),
      is_subscription_eligible: faker.datatype.boolean(),
      in_stock: faker.datatype.boolean(),
    });
  }
  const { data: seededProducts, error: productsError } = await supabase.from('products').insert(products).select();
  if (productsError) {
    console.error('Error seeding products:', productsError);
    return;
  }
  console.log(`Seeded ${seededProducts?.length} products.`);

  console.log('Seeding users and profiles...');
  const users = [];
  const profiles = [];
  for (let i = 0; i < 5; i++) {
    const password = 'Password123!'; // Consistent password for testing
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: faker.internet.email(),
      password: password,
      options: {
        data: {
          full_name: faker.person.fullName(),
        },
      },
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      continue;
    }
    if (authData.user) {
      users.push(authData.user);
      profiles.push({
        id: authData.user.id,
        full_name: authData.user.user_metadata.full_name,
        email: authData.user.email,
        phone: faker.phone.number(),
      });
    }
  }

  // Supabase auth.users triggers public.profiles insert, so we don't insert profiles directly here.
  // Instead, we ensure the trigger is working and update existing profiles with more data.
  // Wait a bit for the trigger to fire
  await new Promise(resolve => setTimeout(resolve, 2000));

  for (const profile of profiles) {
    const { error: updateProfileError } = await supabase.from('profiles').update({ phone: profile.phone }).eq('id', profile.id);
    if (updateProfileError) {
      console.error('Error updating profile with phone:', updateProfileError);
    }
  }
  console.log(`Seeded ${users.length} users and their profiles.`);

  console.log('Seeding addresses...');
  const addresses = [];
  for (const user of users) {
    for (let i = 0; i < faker.number.int({ min: 1, max: 2 }); i++) { // 1 or 2 addresses per user
      addresses.push({
        user_id: user.id,
        address_line1: faker.location.streetAddress(),
        city: faker.location.city(),
        zip_code: faker.location.zipCode(),
        within_pilot_zone: faker.datatype.boolean(), // Randomly assign pilot zone status
      });
    }
  }
  const { data: seededAddresses, error: addressesError } = await supabase.from('addresses').insert(addresses).select();
  if (addressesError) {
    console.error('Error seeding addresses:', addressesError);
    return;
  }
  console.log(`Seeded ${seededAddresses?.length} addresses.`);

  console.log('Seeding pets...');
  const pets = [];
  for (const user of users) {
    for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) { // 1 to 3 pets per user
      pets.push({
        user_id: user.id,
        name: faker.person.firstName(),
        species: faker.helpers.arrayElement(['dog', 'cat']),
        age: faker.number.int({ min: 1, max: 15 }),
        size: faker.helpers.arrayElement(['small', 'medium', 'large']),
      });
    }
  }
  const { data: seededPets, error: petsError } = await supabase.from('pets').insert(pets).select();
  if (petsError) {
    console.error('Error seeding pets:', petsError);
    return;
  }
  console.log(`Seeded ${seededPets?.length} pets.`);

  console.log('Seeding carts and cart items...');
  for (const user of users) {
    // Create a cart for each user
    const { data: cartData, error: cartError } = await supabase.from('carts').insert({ user_id: user.id }).select().single();
    if (cartError) {
      console.error('Error creating cart:', cartError);
      continue;
    }

    // Add random products to the cart
    const itemsToAdd = faker.helpers.arrayElements(seededProducts!, faker.number.int({ min: 1, max: 5 }));
    const cartItems = itemsToAdd.map(product => ({
      cart_id: cartData.id,
      product_id: product.id,
      quantity: faker.number.int({ min: 1, max: 3 }),
      unit_price: product.price,
      line_total: product.price * faker.number.int({ min: 1, max: 3 }),
    }));

    const { error: cartItemsError } = await supabase.from('cart_items').insert(cartItems);
    if (cartItemsError) {
      console.error('Error seeding cart items:', cartItemsError);
    }
  }
  console.log('Seeded carts and cart items.');

  console.log('Seeding subscriptions...');
  const eligibleProducts = seededProducts!.filter(p => p.is_subscription_eligible);
  if (eligibleProducts.length > 0) {
    for (const user of users) {
      if (faker.datatype.boolean()) { // Randomly decide if user has subscription
        const product = faker.helpers.arrayElement(eligibleProducts);
        const frequencyWeeks = faker.helpers.arrayElement([2, 4, 6]);
        const nextDeliveryDate = faker.date.soon({ days: 30 }).toISOString().split('T')[0];

        const { error: subError } = await supabase.from('subscriptions').insert({
          user_id: user.id,
          product_id: product.id,
          frequency_weeks: frequencyWeeks,
          status: 'active',
          next_delivery_date: nextDeliveryDate,
        });
        if (subError) {
          console.error('Error seeding subscription:', subError);
        }
      }
    }
    console.log('Seeded subscriptions.');
  } else {
    console.log('No subscription-eligible products found, skipping subscription seeding.');
  }

  console.log('Seeding orders...');
  for (const user of users) {
    if (faker.datatype.boolean()) { // Randomly decide if user has orders
      const orderProducts = faker.helpers.arrayElements(seededProducts!, faker.number.int({ min: 1, max: 5 }));
      const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * faker.number.int({ min: 1, max: 3 }), 0);
      const deliveryMethod = faker.helpers.arrayElement(['home_delivery', 'pickup']);
      const status = faker.helpers.arrayElement(['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']);

      let deliveryAddressId = null;
      if (deliveryMethod === 'home_delivery' && seededAddresses && seededAddresses.some(a => a.user_id === user.id)) {
        deliveryAddressId = faker.helpers.arrayElement(seededAddresses.filter(a => a.user_id === user.id)).id;
      }

      const { data: orderData, error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        total_amount: totalAmount,
        delivery_method: deliveryMethod,
        status: status,
        delivery_address_id: deliveryAddressId,
        estimated_delivery_window: '60-90 minutes', // Placeholder
      }).select().single();

      if (orderError) {
        console.error('Error seeding order:', orderError);
        continue;
      }

      const orderItems = orderProducts.map(product => ({
        order_id: orderData.id,
        product_id: product.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
        price_at_purchase: product.price,
      }));

      const { error: orderItemsError } = await supabase.from('order_items').insert(orderItems);
      if (orderItemsError) {
        console.error('Error seeding order items:', orderItemsError);
      }
    }
  }
  console.log('Seeded orders and order items.');


  console.log('Database seeding complete!');
}

seedDatabase().catch((err) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
