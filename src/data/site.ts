export const SITE = {
  name: 'ADASH ARCHITECTS',
  url: 'https://adasharchitects.com',
  address: {
    street: 'Maril',
    city: 'Puttur',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
  },
  phoneDisplay: '+91 9480364510',
  phoneHref: 'tel:+919480364510',
  email: 'info@adasharchitects.com',
} as const;

// TODO: Confirm the founder's name. The live site uses both "Adam Shafeeq Ahmed"
// and "Shafeeq Ahmed". This constant is the only place it needs to change.
export const FOUNDER_NAME = 'Shafeeq Ahmed';
export const FOUNDER_TITLE = 'Founder & Principal Architect';

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const CORE_VALUES = [
  { icon: 'lightbulb', title: 'Innovation', text: 'Constantly exploring new materials, technologies, and design methodologies.' },
  { icon: 'leaf', title: 'Sustainability', text: 'Committed to environmentally responsible practices and energy-efficient designs.' },
  { icon: 'users', title: 'Client-Centricity', text: 'Prioritizing your needs and vision throughout every stage of the project.' },
  { icon: 'gem', title: 'Excellence', text: 'Delivering high-quality, durable, and beautiful architectural solutions.' },
  { icon: 'shield-check', title: 'Integrity', text: 'Upholding the highest ethical standards in all our dealings.' },
] as const;
