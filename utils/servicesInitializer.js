const Service = require('../models/Service');



const newServiceData = [
  {
    id: 1,
    title: 'Oil Filter',
    description: 'High-quality oil filter for cars',
    price: 40,
    category: 'Engine',
  },
  {
    id: 2,
    title: 'Tire Set',
    description: 'Set of four durable tires for cars',
    price: 800,
    category: 'Wheels',
  },
  {
    id: 3,
    title: 'Spark Plugs',
    description: 'Set of spark plugs for improved ignition',
    price: 100,
    category: 'Engine',
  },
  {
    id: 4,
    title: 'Brake Pads',
    description: 'Set of reliable brake pads for cars',
    price: 150,
    category: 'Brakes',
  },
  {
    id: 5,
    title: 'Chain Lubricant',
    description: 'Lubricant for car chains and other components',
    price: 30,
    category: 'Maintenance',
  },
  {
    id: 6,
    title: 'Air Filter',
    description: 'High-efficiency air filter for cars',
    price: 50,
    category: 'Engine',
  },
  {
    id: 7,
    title: 'Wheel Alignment Kit',
    description: 'Tools and instructions for wheel alignment',
    price: 250,
    category: 'Wheels',
  },
  {
    id: 8,
    title: 'Car Battery',
    description: 'Long-lasting car battery',
    price: 200,
    category: 'Electrical',
  },
  {
    id: 9,
    title: 'Coolant',
    description: 'Engine coolant for cars',
    price: 60,
    category: 'Engine',
  },
  {
    id: 10,
    title: 'Exhaust System',
    description: 'Complete exhaust system for cars',
    price: 500,
    category: 'Exhaust',
  },
  {
    id: 11,
    title: 'Clutch Kit',
    description: 'Complete clutch replacement kit for cars',
    price: 400,
    category: 'Transmission',
  },
  {
    id: 12,
    title: 'Cabin Air Filter',
    description: 'Filter for clean air inside the car',
    price: 40,
    category: 'Interior',
  },
  {
    id: 13,
    title: 'Suspension Kit',
    description: 'Complete suspension system for cars',
    price: 800,
    category: 'Suspension',
  },
  {
    id: 14,
    title: 'Headlight Bulbs',
    description: 'Set of high-intensity headlight bulbs',
    price: 100,
    category: 'Lighting',
  },
  {
    id: 15,
    title: 'Wheel Bearings',
    description: 'Durable wheel bearings for cars',
    price: 150,
    category: 'Wheels',
  },
  {
    id: 16,
    title: 'Throttle Cable',
    description: 'High-quality throttle cable for cars',
    price: 50,
    category: 'Engine',
  },
  {
    id: 17,
    title: 'Radiator Coolant',
    description: 'Radiator coolant for cars',
    price: 70,
    category: 'Cooling',
  },
  {
    id: 18,
    title: 'Brake Fluid',
    description: 'High-performance brake fluid for cars',
    price: 60,
    category: 'Brakes',
  },
  {
    id: 19,
    title: 'Starter Motor',
    description: 'Reliable starter motor for cars',
    price: 250,
    category: 'Electrical',
  },
  {
    id: 20,
    title: 'Steering Wheel Cover',
    description: 'Comfortable grip steering wheel cover',
    price: 50,
    category: 'Interior',
  },
];



// Function to insert or update services
async function insertOrUpdateServices() {
  try {
    const services = await Service.find({});

    if (services.length === 0) {
      // If no services exist insert the new services
      await Service.insertMany(newServiceData);
      console.log('Initial services inserted successfully.');
    } else {
      // If services exist update them based on your logic
      // can check if each service in newServiceData already exists
      for (const newService of newServiceData) {
        const existingService = services.find((service) => service.id === newService.id);

        if (existingService) {
          // Update the existing service with the new data
          existingService.set(newService);
          await existingService.save();
          console.log(`Service updated: ${newService.title}`);
        } else {
          // Insert the new service if it doesn't exist
          const service = new Service(newService);
          await service.save();
          console.log(`Service inserted: ${newService.title}`);
        }
      }
    }
  } catch (error) {
    console.error('Error inserting/updating services:', error);
  }
}

module.exports = { insertOrUpdateServices };


