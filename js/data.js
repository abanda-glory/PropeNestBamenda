// Initial property data - All properties in Bamenda and its quarters
const initialProperties = [
    {
        id: 1,
        title: "Luxury 3 Bedroom Apartment",
        type: "apartment",
        status: "rent",
        price: 150000,
        location: "Commercial Avenue, Bamenda",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        amenities: ["Water", "Parking", "Security", "Garden", "24/7 Electricity"],
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        description: "A beautiful apartment in Commercial Avenue with modern amenities and stunning views. Perfect for families looking for comfort and convenience in the heart of Bamenda."
    },
    {
        id: 2,
        title: "Modern 4 Bedroom House",
        type: "house",
        status: "sale",
        price: 45000000,
        location: "Mile 4 Nkwen, Bamenda",
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        amenities: ["Water", "Parking", "Swimming Pool", "Generator", "Security", "Garden"],
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        description: "Spacious modern house in Mile 4 Nkwen with pool, perfect for families looking for comfort and luxury. Features include a spacious living area, modern kitchen, and beautiful garden."
    },
    {
        id: 3,
        title: "Commercial Land Plot",
        type: "land",
        status: "sale",
        price: 25000000,
        location: "Up Station, Bamenda",
        bedrooms: 0,
        bathrooms: 0,
        area: 500,
        amenities: ["Road Access", "Documentation", "Corner Piece", "Commercial Zone"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
        ],
        description: "Prime commercial land in Up Station with excellent road access, ideal for business development. Located in a rapidly growing area with high potential for appreciation."
    },
    {
        id: 4,
        title: "Cozy 2 Bedroom Apartment",
        type: "apartment",
        status: "rent",
        price: 80000,
        location: "Ntarikon, Bamenda",
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        amenities: ["Water", "Parking", "Security", "Balcony"],
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800"
        ],
        description: "Affordable and comfortable apartment in Ntarikon. Close to schools, markets, and public transportation. Perfect for small families or young professionals."
    },
    {
        id: 5,
        title: "Hilltop Villa",
        type: "house",
        status: "sale",
        price: 75000000,
        location: "Mulang, Bamenda",
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        amenities: ["Water", "Parking", "Panoramic Views", "Swimming Pool", "Generator", "Security", "Garden"],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
        ],
        description: "Luxurious hilltop villa in Mulang with panoramic views of Bamenda. Perfect for those seeking a tranquil lifestyle with breathtaking scenery."
    },
    {
        id: 6,
        title: "Studio Apartment",
        type: "apartment",
        status: "rent",
        price: 50000,
        location: "Foncha Street, Bamenda",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        amenities: ["Water", "Security", "Furnished"],
        images: [
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
        ],
        description: "Compact and efficient studio apartment on Foncha Street, perfect for students or young professionals. Fully furnished and ready to move in."
    },
    {
        id: 7,
        title: "5 Bedroom Duplex",
        type: "house",
        status: "sale",
        price: 55000000,
        location: "Sisia, Bamenda",
        bedrooms: 5,
        bathrooms: 4,
        area: 280,
        amenities: ["Water", "Parking", "Generator", "Security", "Garden", "Guest House"],
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        description: "Elegant duplex in Sisia with a separate guest house. Features spacious rooms, modern finishes, and a beautiful landscaped garden."
    },
    {
        id: 8,
        title: "Residential Land",
        type: "land",
        status: "sale",
        price: 15000000,
        location: "Azire, Bamenda",
        bedrooms: 0,
        bathrooms: 0,
        area: 600,
        amenities: ["Road Access", "Documentation", "Electricity", "Quiet Neighborhood"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
        ],
        description: "Prime residential land in Azire in a serene environment. Perfect for building your dream home with all necessary documentation in place."
    },
    {
        id: 9,
        title: "Penthouse Apartment",
        type: "apartment",
        status: "rent",
        price: 250000,
        location: "City Chemist, Bamenda",
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        amenities: ["Water", "Parking", "Security", "Gym", "Swimming Pool", "Elevator", "City Views"],
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
        ],
        description: "Luxurious penthouse near City Chemist with panoramic city views. Features include modern appliances, spacious terrace, and access to premium amenities."
    },
    {
        id: 10,
        title: "Bungalow House",
        type: "house",
        status: "sale",
        price: 35000000,
        location: "Mankon, Bamenda",
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        amenities: ["Water", "Parking", "Garden", "Security", "Quiet Area"],
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
        ],
        description: "Charming bungalow in Mankon, a quiet residential area. Perfect for those seeking single-level living with a spacious yard and peaceful environment."
    },
    {
        id: 11,
        title: "Modern Duplex",
        type: "house",
        status: "sale",
        price: 48000000,
        location: "Nkwen, Bamenda",
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        amenities: ["Water", "Parking", "Security", "Garden", "BQ", "Generator"],
        images: [
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800"
        ],
        description: "Beautiful modern duplex in Nkwen with a boys' quarters. Ideal for families, featuring spacious rooms and modern design."
    },
    {
        id: 12,
        title: "Agricultural Land",
        type: "land",
        status: "sale",
        price: 8000000,
        location: "Santa, Bamenda",
        bedrooms: 0,
        bathrooms: 0,
        area: 1000,
        amenities: ["Road Access", "Fertile Soil", "Documentation", "Water Source"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
        ],
        description: "Large agricultural land in Santa, perfect for farming or future residential development. Fertile soil with natural water source."
    },
    {
        id: 13,
        title: "Executive Apartment",
        type: "apartment",
        status: "rent",
        price: 120000,
        location: "Mile 3, Bamenda",
        bedrooms: 3,
        bathrooms: 2,
        area: 110,
        amenities: ["Water", "Parking", "Security", "Balcony", "Furnished"],
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
        ],
        description: "Executive apartment in Mile 3, fully furnished and ready for immediate occupancy. Located in a secure and accessible area."
    },
    {
        id: 14,
        title: "Family House",
        type: "house",
        status: "sale",
        price: 38000000,
        location: "Bambili, Bamenda",
        bedrooms: 4,
        bathrooms: 2,
        area: 180,
        amenities: ["Water", "Parking", "Security", "Garden", "Close to University"],
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"
        ],
        description: "Spacious family house in Bambili, close to the University of Bamenda. Ideal for families with students or university staff."
    },
    {
        id: 15,
        title: "Commercial Plot",
        type: "land",
        status: "sale",
        price: 30000000,
        location: "Food Market Area, Bamenda",
        bedrooms: 0,
        bathrooms: 0,
        area: 400,
        amenities: ["Prime Location", "Road Access", "Documentation", "High Foot Traffic"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"
        ],
        description: "Prime commercial plot near Food Market, perfect for retail business or commercial building. High visibility and foot traffic area."
    }
];

// Initialize data in localStorage if not exists
function initializeData() {
    if (!localStorage.getItem('properties')) {
        localStorage.setItem('properties', JSON.stringify(initialProperties));
    }
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
    if (!localStorage.getItem('nextPropertyId')) {
        localStorage.setItem('nextPropertyId', '16');
    }
}