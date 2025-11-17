import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const movies = [
  {
    title: 'Baahubali: The Beginning',
    titleTelugu: 'బాహుబలి: ద బిగినింగ్',
    alternativeTitles: ['Bahubali', 'Baahubali 1'],
    year: 2015,
    genre: ['Action', 'Drama', 'Fantasy'],
    leadActor: 'Prabhas',
    leadActress: 'Anushka Shetty',
    director: 'S. S. Rajamouli',
    plotHint: 'A young man learns about his royal heritage and seeks to claim his kingdom',
    description: 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.0,
    popularity: 95,
    trivia: ['Highest grossing Indian film at the time of release'],
    tags: ['Epic', 'Blockbuster', 'Period Drama'],
  },
  {
    title: 'Baahubali 2: The Conclusion',
    titleTelugu: 'బాహుబలి 2: ద కన్‌క్లూజన్',
    alternativeTitles: ['Bahubali 2', 'Baahubali: The Conclusion'],
    year: 2017,
    genre: ['Action', 'Drama', 'Fantasy'],
    leadActor: 'Prabhas',
    leadActress: 'Anushka Shetty',
    director: 'S. S. Rajamouli',
    plotHint: 'The story reveals why Kattappa killed Baahubali',
    description: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.2,
    popularity: 98,
    trivia: ['Highest grossing Indian film of all time'],
    tags: ['Epic', 'Blockbuster', 'Period Drama'],
  },
  {
    title: 'RRR',
    titleTelugu: 'ఆర్ఆర్ఆర్',
    alternativeTitles: ['Rise Roar Revolt', 'Roudram Ranam Rudhiram'],
    year: 2022,
    genre: ['Action', 'Drama', 'Historical'],
    leadActor: 'N. T. Rama Rao Jr.',
    leadActress: 'Alia Bhatt',
    director: 'S. S. Rajamouli',
    plotHint: 'Two freedom fighters become best friends fighting against British rule',
    description: 'A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.0,
    popularity: 97,
    trivia: ['Won Oscar for Best Original Song - Naatu Naatu'],
    tags: ['Historical', 'Freedom Fighters', 'Action'],
  },
  {
    title: 'Arjun Reddy',
    titleTelugu: 'అర్జున్ రెడ్డి',
    alternativeTitles: ['Arjun Reddy'],
    year: 2017,
    genre: ['Drama', 'Romance'],
    leadActor: 'Vijay Deverakonda',
    leadActress: 'Shalini Pandey',
    director: 'Sandeep Reddy Vanga',
    plotHint: 'A brilliant surgeon becomes self-destructive after losing his love',
    description: 'Arjun Reddy, a short-tempered house surgeon, descends into alcoholism and self-destruction after his girlfriend is forced to marry another man.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.1,
    popularity: 90,
    trivia: ['Remade in multiple languages including Kabir Singh in Hindi'],
    tags: ['Intense', 'Romance', 'Drama'],
  },
  {
    title: 'Pushpa: The Rise',
    titleTelugu: 'పుష్ప: ద రైజ్',
    alternativeTitles: ['Pushpa 1', 'Pushpa Part 1'],
    year: 2021,
    genre: ['Action', 'Drama', 'Thriller'],
    leadActor: 'Allu Arjun',
    leadActress: 'Rashmika Mandanna',
    director: 'Sukumar',
    plotHint: 'A laborer rises through ranks of a red sandalwood smuggling syndicate',
    description: 'Violence erupts between red sandalwood smugglers and the police charged with bringing down their organization in the Seshachalam forest of South India.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 7.6,
    popularity: 93,
    trivia: ['Allu Arjun won National Film Award for Best Actor'],
    tags: ['Action', 'Mass', 'Thriller'],
  },
  {
    title: 'Eega',
    titleTelugu: 'ఈగ',
    alternativeTitles: ['Makkhi', 'Fly', 'Naan Ee'],
    year: 2012,
    genre: ['Fantasy', 'Romance', 'Thriller'],
    leadActor: 'Nani',
    leadActress: 'Samantha Ruth Prabhu',
    director: 'S. S. Rajamouli',
    plotHint: 'A murdered man reincarnates as a housefly to get revenge',
    description: 'Nani loves Bindu but is killed by a jealous Sudeep, who lusts after Bindu. Nani is reincarnated as a fly and tries to protect Bindu and get revenge on Sudeep.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 7.7,
    popularity: 85,
    trivia: ['Won National Film Award for Best Feature Film in Telugu'],
    tags: ['Fantasy', 'Unique', 'VFX'],
  },
  {
    title: 'Fidaa',
    titleTelugu: 'ఫిదా',
    alternativeTitles: ['Fida'],
    year: 2017,
    genre: ['Romance', 'Drama'],
    leadActor: 'Varun Tej',
    leadActress: 'Sai Pallavi',
    director: 'Sekhar Kammula',
    plotHint: 'A medical student falls for a spirited village girl',
    description: 'A love story between a conservative man and a modern woman who is unsure of her feelings.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 7.6,
    popularity: 82,
    trivia: ['Sai Pallavi became a household name after this film'],
    tags: ['Romance', 'Village', 'Family'],
  },
  {
    title: 'Mahanati',
    titleTelugu: 'మహనటి',
    alternativeTitles: ['Nadigaiyar Thilagam'],
    year: 2018,
    genre: ['Biography', 'Drama'],
    leadActor: 'Dulquer Salmaan',
    leadActress: 'Keerthy Suresh',
    director: 'Nag Ashwin',
    plotHint: 'Biography of legendary actress Savitri',
    description: 'The life story of actress Savitri, the first female superstar of Indian cinema.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.4,
    popularity: 88,
    trivia: ['Keerthy Suresh won National Film Award for Best Actress'],
    tags: ['Biography', 'Period', 'Drama'],
  },
  {
    title: 'Ala Vaikunthapurramuloo',
    titleTelugu: 'అల వైకుంఠపురములో',
    alternativeTitles: ['AVPL', 'Ala Vaikuntapuram Lo'],
    year: 2020,
    genre: ['Action', 'Drama', 'Family'],
    leadActor: 'Allu Arjun',
    leadActress: 'Pooja Hegde',
    director: 'Trivikram Srinivas',
    plotHint: 'A man discovers he was swapped at birth and seeks his real family',
    description: 'After growing up enduring criticism from his father, a young man finds his world shaken upon learning he was switched at birth with a millionaire\'s son.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 7.2,
    popularity: 90,
    trivia: ['Third highest-grossing Telugu film of all time'],
    tags: ['Family', 'Action', 'Drama'],
  },
  {
    title: 'Rangasthalam',
    titleTelugu: 'రంగస్థలం',
    alternativeTitles: ['Rangastalam'],
    year: 2018,
    genre: ['Action', 'Drama'],
    leadActor: 'Ram Charan',
    leadActress: 'Samantha Ruth Prabhu',
    director: 'Sukumar',
    plotHint: 'A hearing-impaired man fights against corruption in his village',
    description: 'Set in 1980s, Chitti Babu, a hearing-impaired villager, falls in love with Rama Lakshmi. His brother Prasad leads a rebellion against the local government who exploits villagers.',
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    rating: 8.2,
    popularity: 89,
    trivia: ['Highest grossing Telugu film of 2018'],
    tags: ['Period', 'Action', 'Drama', 'Village'],
  },
]

const songs = [
  {
    title: 'Naatu Naatu',
    titleTelugu: 'నాటు నాటు',
    movie: 'RRR',
    singers: ['Rahul Sipligunj', 'Kaala Bhairava'],
    musicDirector: 'M. M. Keeravani',
    lyricist: 'Chandrabose',
    year: 2022,
    audioUrl: 'https://example.com/naatu-naatu.mp3',
    audioSegments: {
      '5': 'https://example.com/naatu-naatu-5s.mp3',
      '10': 'https://example.com/naatu-naatu-10s.mp3',
      '15': 'https://example.com/naatu-naatu-15s.mp3',
      '20': 'https://example.com/naatu-naatu-20s.mp3',
      '25': 'https://example.com/naatu-naatu-25s.mp3',
      '30': 'https://example.com/naatu-naatu-30s.mp3',
    },
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    popularity: 98,
  },
  {
    title: 'Butta Bomma',
    titleTelugu: 'బుట్ట బొమ్మ',
    movie: 'Ala Vaikunthapurramuloo',
    singers: ['Armaan Malik'],
    musicDirector: 'Thaman S',
    lyricist: 'Ramajogayya Sastry',
    year: 2020,
    audioUrl: 'https://example.com/butta-bomma.mp3',
    audioSegments: {
      '5': 'https://example.com/butta-bomma-5s.mp3',
      '10': 'https://example.com/butta-bomma-10s.mp3',
      '15': 'https://example.com/butta-bomma-15s.mp3',
      '20': 'https://example.com/butta-bomma-20s.mp3',
      '25': 'https://example.com/butta-bomma-25s.mp3',
      '30': 'https://example.com/butta-bomma-30s.mp3',
    },
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    popularity: 95,
  },
  {
    title: 'Saami Saami',
    titleTelugu: 'సామి సామి',
    movie: 'Pushpa: The Rise',
    singers: ['Mounika Yadav'],
    musicDirector: 'Devi Sri Prasad',
    lyricist: 'Chandrabose',
    year: 2021,
    audioUrl: 'https://example.com/saami-saami.mp3',
    audioSegments: {
      '5': 'https://example.com/saami-saami-5s.mp3',
      '10': 'https://example.com/saami-saami-10s.mp3',
      '15': 'https://example.com/saami-saami-15s.mp3',
      '20': 'https://example.com/saami-saami-20s.mp3',
      '25': 'https://example.com/saami-saami-25s.mp3',
      '30': 'https://example.com/saami-saami-30s.mp3',
    },
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    popularity: 92,
  },
  {
    title: 'Vachinde',
    titleTelugu: 'వచ్చిందే',
    movie: 'Fidaa',
    singers: ['Madhu Priya'],
    musicDirector: 'Shakthikanth Karthick',
    lyricist: 'Chandrabose',
    year: 2017,
    audioUrl: 'https://example.com/vachinde.mp3',
    audioSegments: {
      '5': 'https://example.com/vachinde-5s.mp3',
      '10': 'https://example.com/vachinde-10s.mp3',
      '15': 'https://example.com/vachinde-15s.mp3',
      '20': 'https://example.com/vachinde-20s.mp3',
      '25': 'https://example.com/vachinde-25s.mp3',
      '30': 'https://example.com/vachinde-30s.mp3',
    },
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    popularity: 88,
  },
  {
    title: 'Mooga Manasulu',
    titleTelugu: 'మూగ మనసులు',
    movie: 'Mahanati',
    singers: ['Anurag Kulkarni', 'Ramya Behara'],
    musicDirector: 'Mickey J Meyer',
    lyricist: 'Sirivennela Seetharama Sastry',
    year: 2018,
    audioUrl: 'https://example.com/mooga-manasulu.mp3',
    audioSegments: {
      '5': 'https://example.com/mooga-manasulu-5s.mp3',
      '10': 'https://example.com/mooga-manasulu-10s.mp3',
      '15': 'https://example.com/mooga-manasulu-15s.mp3',
      '20': 'https://example.com/mooga-manasulu-20s.mp3',
      '25': 'https://example.com/mooga-manasulu-25s.mp3',
      '30': 'https://example.com/mooga-manasulu-30s.mp3',
    },
    posterUrl: 'https://res.cloudinary.com/sample/image/upload/sample.jpg',
    popularity: 85,
  },
]

const products = [
  {
    name: 'Baahubali Movie Poster',
    description: 'Official high-quality poster of Baahubali: The Beginning featuring the iconic battle scene',
    price: 499,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/baahubali-poster',
    inStock: true,
    featured: true,
  },
  {
    name: 'RRR T-Shirt - Naatu Naatu',
    description: 'Premium cotton t-shirt featuring Naatu Naatu dance artwork from RRR',
    price: 799,
    category: 'Apparel',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/rrr-tshirt',
    inStock: true,
    featured: true,
  },
  {
    name: 'Pushpa Action Figure',
    description: 'Collectible action figure of Pushpa Raj in iconic hand gesture pose',
    price: 1499,
    category: 'Collectibles',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/pushpa-figure',
    inStock: true,
    featured: true,
  },
  {
    name: 'Arjun Reddy Hoodie',
    description: 'Comfortable hoodie with Arjun Reddy movie artwork',
    price: 1299,
    category: 'Apparel',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/arjun-reddy-hoodie',
    inStock: true,
    featured: false,
  },
  {
    name: 'Mahanati Book - Savitri Biography',
    description: 'Complete biography of legendary actress Savitri with rare photographs',
    price: 599,
    category: 'Books',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/mahanati-book',
    inStock: true,
    featured: false,
  },
  {
    name: 'Baahubali 2 Poster Set',
    description: 'Set of 3 premium posters from Baahubali 2: The Conclusion',
    price: 899,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/baahubali2-poster-set',
    inStock: true,
    featured: false,
  },
  {
    name: 'Eega Movie Collectible',
    description: 'Limited edition collectible from the fantasy film Eega',
    price: 1999,
    category: 'Collectibles',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/eega-collectible',
    inStock: false,
    featured: false,
  },
  {
    name: 'Fidaa Couple T-Shirt',
    description: 'Matching couple t-shirts inspired by Fidaa romance',
    price: 1499,
    category: 'Apparel',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/fidaa-couple-tshirt',
    inStock: true,
    featured: false,
  },
  {
    name: 'RRR Ram Charan Poster',
    description: 'Exclusive poster featuring Ram Charan from RRR',
    price: 449,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/rrr-ram-charan-poster',
    inStock: true,
    featured: false,
  },
  {
    name: 'RRR NTR Poster',
    description: 'Exclusive poster featuring N. T. Rama Rao Jr. from RRR',
    price: 449,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/rrr-ntr-poster',
    inStock: true,
    featured: false,
  },
  {
    name: 'Pushpa Cap',
    description: 'Stylish cap with Pushpa movie branding',
    price: 399,
    category: 'Apparel',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/pushpa-cap',
    inStock: true,
    featured: false,
  },
  {
    name: 'Rangasthalam Poster',
    description: 'Beautiful poster from the period drama Rangasthalam',
    price: 499,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/rangasthalam-poster',
    inStock: true,
    featured: false,
  },
  {
    name: 'Telugu Cinema History Book',
    description: 'Comprehensive book covering 100 years of Telugu cinema',
    price: 1299,
    category: 'Books',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/telugu-cinema-history',
    inStock: true,
    featured: false,
  },
  {
    name: 'Ala Vaikunthapurramuloo Poster',
    description: 'Colorful poster from the family entertainer Ala Vaikunthapurramuloo',
    price: 449,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/avpl-poster',
    inStock: true,
    featured: false,
  },
  {
    name: 'Baahubali Sword Replica',
    description: 'Collectible replica of Baahubali\'s sword (decorative)',
    price: 2999,
    category: 'Collectibles',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/baahubali-sword',
    inStock: false,
    featured: false,
  },
  {
    name: 'Mahanati Framed Poster',
    description: 'Premium framed poster of Mahanati with Keerthy Suresh',
    price: 1499,
    category: 'Poster',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/mahanati-framed-poster',
    inStock: true,
    featured: false,
  },
  {
    name: 'Telugu Cinema Coffee Mug Set',
    description: 'Set of 4 mugs featuring iconic Telugu movie dialogues',
    price: 799,
    category: 'Other',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/movie-mug-set',
    inStock: true,
    featured: false,
  },
  {
    name: 'RRR Naatu Naatu Dance Book',
    description: 'Behind-the-scenes book about the making of Naatu Naatu song',
    price: 699,
    category: 'Books',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/naatu-naatu-book',
    inStock: true,
    featured: false,
  },
  {
    name: 'Pushpa Notebook Set',
    description: 'Set of 3 notebooks with Pushpa movie designs',
    price: 349,
    category: 'Other',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/pushpa-notebooks',
    inStock: true,
    featured: false,
  },
  {
    name: 'Arjun Reddy Sunglasses',
    description: 'Replica of iconic sunglasses worn by Vijay Deverakonda in Arjun Reddy',
    price: 1199,
    category: 'Collectibles',
    imageUrl: ['https://res.cloudinary.com/sample/image/upload/sample.jpg'],
    purchaseUrl: 'https://example.com/buy/arjun-reddy-sunglasses',
    inStock: true,
    featured: false,
  },
]

async function main() {
  console.log('Starting database seed...')

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.dailyRecommendation.deleteMany()
  await prisma.product.deleteMany()
  await prisma.song.deleteMany()
  await prisma.movie.deleteMany()

  // Seed movies
  console.log('Seeding movies...')
  const createdMovies = []
  for (const movie of movies) {
    const created = await prisma.movie.create({
      data: movie,
    })
    createdMovies.push(created)
  }
  console.log(`✓ Created ${movies.length} movies`)

  // Seed songs
  console.log('Seeding songs...')
  for (const song of songs) {
    await prisma.song.create({
      data: song,
    })
  }
  console.log(`✓ Created ${songs.length} songs`)

  // Seed products (some linked to movies)
  console.log('Seeding products...')
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    // Link some products to movies
    let movieId = undefined
    if (product.name.includes('Baahubali') && !product.name.includes('2')) {
      movieId = createdMovies.find((m) => m.title === 'Baahubali: The Beginning')?.id
    } else if (product.name.includes('Baahubali 2')) {
      movieId = createdMovies.find((m) => m.title === 'Baahubali 2: The Conclusion')?.id
    } else if (product.name.includes('RRR')) {
      movieId = createdMovies.find((m) => m.title === 'RRR')?.id
    } else if (product.name.includes('Pushpa')) {
      movieId = createdMovies.find((m) => m.title === 'Pushpa: The Rise')?.id
    } else if (product.name.includes('Arjun Reddy')) {
      movieId = createdMovies.find((m) => m.title === 'Arjun Reddy')?.id
    } else if (product.name.includes('Mahanati')) {
      movieId = createdMovies.find((m) => m.title === 'Mahanati')?.id
    } else if (product.name.includes('Fidaa')) {
      movieId = createdMovies.find((m) => m.title === 'Fidaa')?.id
    } else if (product.name.includes('Eega')) {
      movieId = createdMovies.find((m) => m.title === 'Eega')?.id
    } else if (product.name.includes('Rangasthalam')) {
      movieId = createdMovies.find((m) => m.title === 'Rangasthalam')?.id
    } else if (product.name.includes('Ala Vaikunthapurramuloo')) {
      movieId = createdMovies.find((m) => m.title === 'Ala Vaikunthapurramuloo')?.id
    }

    await prisma.product.create({
      data: {
        ...product,
        movieId,
      },
    })
  }
  console.log(`✓ Created ${products.length} products`)

  // Seed daily recommendations (past 7 days)
  console.log('Seeding daily recommendations...')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const recommendationDescriptions = [
    'A masterpiece that showcases the grandeur and scale of Telugu cinema. A must-watch for any cinema enthusiast.',
    'An emotionally powerful film that will stay with you long after the credits roll.',
    'A perfect blend of entertainment and storytelling that represents the best of Telugu filmmaking.',
    'An innovative and unique film that pushes the boundaries of conventional storytelling.',
    'A heartwarming tale that beautifully captures the essence of human relationships.',
    'A visually stunning epic that takes cinema to new heights.',
    'A compelling narrative that showcases exceptional performances and direction.',
  ]

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Select a movie that hasn't been recommended yet
    const movie = createdMovies[i % createdMovies.length]

    await prisma.dailyRecommendation.create({
      data: {
        date,
        movieId: movie.id,
        description: recommendationDescriptions[6 - i],
        curator: 'Telugu Cinema Hub',
      },
    })
  }
  console.log(`✓ Created 7 daily recommendations`)

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
