// All project data and every site photo live in this file.
// `file` is a name inside /public/images/projects/.
// To replace a placeholder: add the real photo, point `file` at it, rewrite `alt`
// to describe the real photo, and set `placeholder: false`.

export interface SiteImage {
  file: string;
  alt: string;
  placeholder: boolean;
}

export interface Project {
  slug: string;
  name: string;
  type: string;
  description: string;
  image: SiteImage;
}

export const projects: Project[] = [
  {
    slug: 'medland-speciality-hospital',
    name: 'Medland Speciality Hospital',
    type: 'Healthcare',
    // TODO: Add the real description. The live site's text describes a home, not a hospital.
    description: '',
    image: {
      file: 'medland-speciality-hospital.jpg',
      alt: 'a multi-storey brick and glass building beside a road',
      placeholder: true,
    },
  },
  {
    slug: 'urban-commercial-tower',
    name: 'Urban Commercial Tower',
    type: 'Commercial',
    description:
      'A landmark skyscraper integrating advanced green technology and panoramic city views, redefining urban workspaces.',
    image: {
      file: 'urban-commercial-tower.jpg',
      alt: 'a curved glass office building reflecting palm trees',
      placeholder: true,
    },
  },
  {
    slug: 'community-hub-library',
    name: 'Community Hub & Library',
    type: 'Civic',
    description:
      'A vibrant public space fostering connection and learning for all ages, designed with accessibility and community engagement in mind.',
    image: {
      file: 'community-hub-library.jpg',
      alt: 'curved library shelves full of books beneath a timber ceiling',
      placeholder: true,
    },
  },
  {
    slug: 'eco-friendly-mountain-resort',
    name: 'Eco-Friendly Mountain Resort',
    type: 'Hospitality',
    description:
      'Harmonizing luxury and nature with sustainable materials and breathtaking views, offering an immersive and responsible retreat experience.',
    image: {
      file: 'eco-mountain-resort.jpg',
      alt: 'a resort pool among palm trees with mountains behind',
      placeholder: true,
    },
  },
  {
    slug: 'historic-building-renovation',
    name: 'Historic Building Renovation',
    type: 'Renovation',
    description:
      'Preserving heritage while infusing modern functionality and design, revitalizing a classic structure for contemporary use.',
    image: {
      file: 'historic-building-renovation.jpg',
      alt: 'a stone manor house surrounded by trees, reflected in a pond',
      placeholder: true,
    },
  },
  {
    slug: 'mixed-use-urban-development',
    name: 'Mixed-Use Urban Development',
    type: 'Mixed use',
    description:
      'Creating dynamic living, working, and retail spaces in the heart of the city, promoting a vibrant and integrated urban lifestyle.',
    image: {
      file: 'mixed-use-urban-development.jpg',
      alt: 'an apartment block with balconies seen from below',
      placeholder: true,
    },
  },
];

// Photos used on the homepage that are not tied to a project.
export const siteImages = {
  hero: {
    file: 'hero.jpg',
    alt: 'a modern white and timber house with a pool, under a wide blue sky',
    placeholder: true,
  },
  services: {
    file: 'services-architecture.jpg',
    alt: 'a white angular building with a glass facade, seen against a pale sky',
    placeholder: true,
  },
  pairLarge: {
    file: 'pair-large.jpg',
    alt: 'a modern house with timber cladding and a landscaped lawn',
    placeholder: true,
  },
  pairSmall: {
    file: 'pair-small.jpg',
    alt: 'a white modular building seen against a pale sky',
    placeholder: true,
  },
  feature: {
    file: 'feature.jpg',
    alt: 'a dark timber house lit from within, beneath a large tree',
    placeholder: true,
  },
  // Page heroes. Each inner page uses a different photo from the homepage.
  projectsHero: {
    file: 'services-architecture.jpg',
    alt: 'a white angular building with a glass facade, seen against a pale sky',
    placeholder: true,
  },
  aboutHero: {
    file: 'historic-building-renovation.jpg',
    alt: 'a stone manor house surrounded by trees, reflected in a pond',
    placeholder: true,
  },
  contactHero: {
    file: 'mixed-use-urban-development.jpg',
    alt: 'an apartment block with balconies seen from below',
    placeholder: true,
  },
} satisfies Record<string, SiteImage>;
