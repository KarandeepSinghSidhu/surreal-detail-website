export type ServiceItem = {
  slug: string
  label: string
  shortDesc: string
  description: string
  features: string[]
  duration: string
  image: string
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'ppf',
    label: 'Paint Protection Film',
    shortDesc: 'Paint Protection Film — full front, full car, or custom zones.',
    description:
      'Self-healing urethane film that shields your paint from stone chips, road debris, and everyday wear. We offer full-front packages, track-focused coverage, or complete vehicle wraps with precision-cut panels and seamless edges.',
    features: [
      'Full front, full body, or custom zone coverage',
      'Self-healing top coat for light scratch recovery',
      'Optically clear finish with no orange peel',
      '7–10 year durability with proper care',
    ],
    duration: '1–3 days depending on coverage',
    image: '/images/C4CA46ED-8B30-4B81-AF0B-E0BCE358AA20_1_105_c.jpeg',
  },
  {
    slug: 'ceramic-coating',
    label: 'Ceramic Coating',
    shortDesc: 'GTechniq Crystal Serum Light & Ultra. Multi-year hydrophobic protection.',
    description:
      'GTechniq certified ceramic coatings bond at a molecular level to create a slick, hydrophobic barrier. Water, dirt, and contaminants bead off effortlessly while UV and chemical resistance keep your finish looking factory-fresh for years.',
    features: [
      'GTechniq Crystal Serum Light & Ultra',
      'Multi-year manufacturer-backed warranty',
      'Extreme hydrophobic and self-cleaning effect',
      'Enhanced gloss, depth, and colour pop',
    ],
    duration: '1–3 days with paint prep',
    image: '/images/FF30C826-62C0-44DA-A43E-D060E3FBFDF1_1_105_c.jpeg',
  },
  {
    slug: 'paint-correction',
    label: 'Paint Correction',
    shortDesc: 'Single and two-stage machine polish. Remove swirls, scratches, oxidation.',
    description:
      'Machine polishing with Rupes big-foot systems to remove swirl marks, light scratches, oxidation, and holograms. Single-stage for maintenance refreshes; two-stage for showroom-level clarity before coating or PPF.',
    features: [
      'Single and two-stage correction packages',
      'Rupes polishers with premium compounds',
      'Paint depth measured before and after',
      'Ideal prep before ceramic or PPF',
    ],
    duration: '1–2 days',
    image: '/images/Emerie---paint-correction-polishing00086_1920px-640w.webp',
  },
  {
    slug: 'full-detail',
    label: 'Full Detail',
    shortDesc: 'Complete interior and exterior transformation — the works.',
    description:
      'A top-to-bottom reset for your vehicle. Exterior wash, decontamination, machine polish, and protection — paired with a deep interior clean, leather conditioning, and every surface brought back to its best.',
    features: [
      'Full exterior wash and decontamination',
      'Interior vacuum, steam, and surface treatment',
      'Leather and trim conditioning',
      'Optional add-on protection packages',
    ],
    duration: '1–2 days',
    image: '/images/F462CACD-1A4C-4D63-A9A6-38B1377B3B7A_1_102_a.jpeg',
  },
  {
    slug: 'interior-detail',
    label: 'Interior Detail',
    shortDesc: 'Deep clean for carpets, leather, plastics, and glass.',
    description:
      'Focused interior restoration using Koch Chemie and dedicated extraction tools. Ideal for daily drivers, pre-sale prep, or seasonal refreshes that bring cabins back to like-new condition.',
    features: [
      'Carpet and upholstery extraction',
      'Leather cleaning and conditioning',
      'Odour neutralisation treatment',
      'Glass, vents, and crevice detailing',
    ],
    duration: '4–8 hours',
    image: '/images/88911411-6413-4FC7-9482-CE8E1742B650_1_105_c.jpeg',
  },
  {
    slug: 'maintenance',
    label: 'Maintenance & Aftercare',
    shortDesc: 'Safe washes and top-up treatments for coated or filmed vehicles.',
    description:
      'Keep your coating or PPF performing at its peak. pH-neutral washes, iron decontamination, and GTechniq maintenance products applied the right way — so your investment lasts.',
    features: [
      'Coating-safe wash techniques',
      'Top-up hydrophobic boosters',
      'PPF-safe cleaning products',
      'Scheduled maintenance plans available',
    ],
    duration: '2–4 hours',
    image: '/images/C4EE8457-A014-4911-ABC9-E553096082A6_1_105_c.jpeg',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function servicePath(slug: string) {
  return `/services/${slug}`
}

export type PPFBenefit = {
  title: string
  subtitle: string
  body: string
  zone: 'front' | 'sides' | 'roof' | 'full' | 'complete'
}

export const PPF_BENEFITS: PPFBenefit[] = [
  {
    title: 'Impact Protection',
    subtitle: 'Front-end defence',
    body: 'PPF absorbs stone chips, gravel, and road debris before they reach your paint. Hood, bumper, and mirrors stay flawless on motorways and back roads alike.',
    zone: 'front',
  },
  {
    title: 'Self-Healing',
    subtitle: 'Scratches that disappear',
    body: 'The elastomeric top coat recovers from light swirls and wash marks with heat — sun, warm water, or a heat gun brings the surface back to optical clarity.',
    zone: 'sides',
  },
  {
    title: 'UV & Chemical Shield',
    subtitle: 'Built for harsh conditions',
    body: 'Film blocks UV oxidation and resists bird lime, bug splatter, and road tar. Your clear coat stays protected year-round in Auckland sun and coastal air.',
    zone: 'roof',
  },
  {
    title: 'Invisible Finish',
    subtitle: 'Optically clear film',
    body: 'Premium urethane is virtually undetectable once installed. No orange peel, no yellowing — just deep gloss and sharper paint reflection.',
    zone: 'full',
  },
  {
    title: 'Long-Term Value',
    subtitle: '7–10 year protection',
    body: 'Preserve factory paint for resale and peace of mind. Full-front or full-body packages keep your vehicle looking showroom-fresh for years.',
    zone: 'complete',
  },
]
