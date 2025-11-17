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

async function main() {
  console.log('Starting database seed...')

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.song.deleteMany()
  await prisma.movie.deleteMany()

  // Seed movies
  console.log('Seeding movies...')
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    })
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
