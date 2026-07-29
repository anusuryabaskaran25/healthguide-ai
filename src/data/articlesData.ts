export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'ai-revolution-healthcare',
    title: 'How AI Diagnostic Systems Are Transforming Modern Healthcare',
    category: 'AI & Innovation',
    readTime: '5 min read',
    date: 'July 28, 2026',
    author: 'Dr. Evelyn Vance, MD',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore how generative AI algorithms, predictive risk modeling, and neural pathology scans are speeding up disease detection and personalizing patient care.',
    content: `
      Artificial Intelligence is rapidly evolving from a futuristic concept into an indispensable clinical partner in modern medical diagnostics. 
      By analyzing millions of data points across electronic health records, genomic sequences, and radiological scans in milliseconds, AI models achieve unprecedented diagnostic accuracy.

      ### Key Innovations in AI Medicine:
      1. **Early Pathology Detection**: AI computer vision models detect micro-lesions in mammograms and lung CT scans up to 2 years before visible symptoms appear.
      2. **Personalized Pharmacogenomics**: Machine learning algorithms analyze individual DNA variations to predict exact drug dosages and adverse reactions.
      3. **24/7 Virtual Health Assistants**: Intelligent patient triage bots provide evidence-based guidance, decreasing emergency room overcrowding.

      ### Ethical Considerations & The Human Element
      While AI provides extraordinary analytical power, the human doctor-patient relationship remains central. Future healthcare integrates AI as a supercharged second opinion, empowering physicians to spend more meaningful time with patients.
    `,
    tags: ['AI Healthcare', 'Medical Innovation', 'Digital Health', 'Diagnostics']
  },
  {
    id: 'circadian-rhythm-sleep-optimization',
    title: 'The Science of Circadian Rhythm: Unlocking Deep Rest restorative Sleep',
    category: 'Sleep & Longevity',
    readTime: '6 min read',
    date: 'July 25, 2026',
    author: 'Dr. Marcus Thorne, PhD',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover evidence-based protocols to align your master biological clock, boost natural melatonin production, and eliminate morning brain fog.',
    content: `
      Your circadian clock is a 24-hour internal master timer located in the suprachiasmatic nucleus (SCN) of your hypothalamus. 
      Aligning your environment with this natural biological pulse regulates growth hormone release, cellular repair, and cognitive sharpness.

      ### 4 Protocols for Perfect Sleep Hygiene:
      * **Morning Sunlight View**: View 10-15 minutes of natural morning sunlight within 60 minutes of waking to trigger cortisol release and set your night melatonin countdown.
      * **Temperature Drop**: Lower bedroom ambient temperature to 65-68°F (18-20°C). Body core temperature must drop by ~2°F to initiate deep stage-3 NREM sleep.
      * **Caffeine Cutoff**: Stop caffeine consumption 8 to 10 hours before sleep to prevent adenosine receptor blockade during night restoration.
      * **Dim Evening Blue Light**: Use orange blue-blocker glasses or dim overhead lights 2 hours prior to bed.
    `,
    tags: ['Sleep Science', 'Circadian Rhythm', 'Wellness', 'Biohacking']
  },
  {
    id: 'gut-brain-axis-mental-health',
    title: 'The Gut-Brain Axis: How Microbiome Health Controls Mood & Stress',
    category: 'Nutrition & Mental Health',
    readTime: '7 min read',
    date: 'July 22, 2026',
    author: 'Elena Rostova, RDN',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Over 90% of your body’s serotonin is manufactured in the digestive tract. Learn how fermented foods and prebiotic fibers reduce anxiety.',
    content: `
      The vagus nerve serves as a bidirectional superhighway connecting your central nervous system with your enteric nervous system (the gut). 
      Trillions of microbial organisms in your gut flora actively synthesize neurotransmitters including Serotonin, GABA, and Dopamine.

      ### High-Performance Foods for Gut Diversity:
      1. **Polyphenol-Rich Foods**: Dark berries, extra virgin olive oil, green tea, and 85%+ dark chocolate feed beneficial *Akkermansia* bacteria.
      2. **Fermented Probiotics**: Kefir, kimchi, authentic sauerkraut, and kombucha reseed beneficial bacterial strains.
      3. **Soluble Prebiotic Fiber**: Inulin from garlic, onions, leeks, and green bananas produces Short-Chain Fatty Acids (SCFAs like Butyrate) that repair the intestinal lining.
    `,
    tags: ['Microbiome', 'Mental Health', 'Nutrition', 'Gut Health']
  }
];
