export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  prescriptionRequired: boolean;
  uses: string[];
  dosage: {
    adults: string;
    children: string;
    frequency: string;
  };
  sideEffects: {
    common: string[];
    severe: string[];
  };
  warnings: string[];
  interactions: string[];
  storage: string;
  pregnancySafety: 'Category A' | 'Category B' | 'Category C' | 'Category D' | 'Category X';
}

export const MEDICINES: Medicine[] = [
  {
    id: 'amoxicillin',
    name: 'Amoxil',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotics (Penicillin)',
    prescriptionRequired: true,
    uses: ['Bacterial sinusitis', 'Strep throat', 'Pneumonia', 'Middle ear infection (Otitis media)', 'Urinary tract infection'],
    dosage: {
      adults: '500mg to 875mg',
      children: '20mg to 45mg/kg body weight based on infection',
      frequency: 'Every 8 or 12 hours for 7 to 10 days'
    },
    sideEffects: {
      common: ['Mild nausea', 'Diarrhea', 'Skin rash', 'Vomiting'],
      severe: ['Severe allergic anaphylaxis', 'Clostridioides difficile colitis', 'Yellowing skin/eyes (Jaundice)']
    },
    warnings: [
      'Do not use if allergic to penicillin or cephalosporins.',
      'Complete the entire prescribed course even if symptoms improve early to prevent antibiotic resistance.'
    ],
    interactions: ['Methotrexate', 'Oral Typhoid Vaccine', 'Allopurinol', 'Warfarin'],
    storage: 'Store capsules at room temperature (20-25°C). Reconstituted oral suspension must be kept refrigerated and used within 14 days.',
    pregnancySafety: 'Category B'
  },
  {
    id: 'paracetamol',
    name: 'Tylenol / Panadol',
    genericName: 'Acetaminophen / Paracetamol',
    category: 'Analgesic & Antipyretic',
    prescriptionRequired: false,
    uses: ['Fever reduction', 'Mild to moderate headache', 'Muscle aches', 'Toothache', 'Arthritis pain relief'],
    dosage: {
      adults: '500mg to 1000mg per dose (Max 4000mg in 24 hours)',
      children: '10mg to 15mg/kg per dose',
      frequency: 'Every 4 to 6 hours as needed'
    },
    sideEffects: {
      common: ['Nausea', 'Loss of appetite', 'Headache'],
      severe: ['Hepatotoxicity (liver damage with high doses)', 'Severe skin reactions (SJS/TEN)']
    },
    warnings: [
      'Do not exceed 4,000mg per day to avoid liver failure.',
      'Avoid consuming alcohol while taking acetaminophen.'
    ],
    interactions: ['Alcohol', 'Warfarin', 'Isoniazid', 'Phenytoin'],
    storage: 'Store at room temperature away from heat and moisture.',
    pregnancySafety: 'Category B'
  },
  {
    id: 'metformin',
    name: 'Glucophage',
    genericName: 'Metformin Hydrochloride',
    category: 'Antidiabetic (Biguanide)',
    prescriptionRequired: true,
    uses: ['Type 2 Diabetes Mellitus blood glucose control', 'Polycystic Ovary Syndrome (PCOS)', 'Gestational diabetes management'],
    dosage: {
      adults: '500mg to 1000mg twice daily with meals (Max 2550mg/day)',
      children: '500mg once or twice daily (Age 10+)',
      frequency: 'With morning and evening meals'
    },
    sideEffects: {
      common: ['Gastrointestinal upset', 'Flatulence', 'Metallic taste', 'Diarrhea'],
      severe: ['Lactic acidosis (rare but life-threatening)', 'Vitamin B12 deficiency with long-term use']
    },
    warnings: [
      'Discontinue temporarily before iodinated contrast imaging studies.',
      'Monitor kidney function (eGFR) regularly.'
    ],
    interactions: ['Cimetidine', 'Dolicutegravir', 'Topiramate', 'Contrast agents'],
    storage: 'Store tightly closed at controlled room temperature.',
    pregnancySafety: 'Category B'
  },
  {
    id: 'atorvastatin',
    name: 'Lipitor',
    genericName: 'Atorvastatin Calcium',
    category: 'Cardiovascular (HMG-CoA Reductase Inhibitor / Statin)',
    prescriptionRequired: true,
    uses: ['Hypercholesterolemia', 'Prevention of cardiovascular disease', 'Post-myocardial infarction secondary prevention'],
    dosage: {
      adults: '10mg to 80mg once daily',
      children: '10mg to 20mg once daily (Age 10-17 with familial hypercholesterolemia)',
      frequency: 'Once daily (evening preferred)'
    },
    sideEffects: {
      common: ['Joint pain', 'Mild muscle aches', 'Diarrhea', 'Nausea'],
      severe: ['Rhabdomyolysis (severe muscle breakdown)', 'Elevated liver enzymes']
    },
    warnings: [
      'Do not take during pregnancy or breastfeeding.',
      'Avoid large quantities of grapefruit juice (inhibits CYP3A4 metabolism).'
    ],
    interactions: ['Gemfibrozil', 'Clarithromycin', 'Cyclosporine', 'Grapefruit juice'],
    storage: 'Store between 20°C to 25°C (68°F to 77°F).',
    pregnancySafety: 'Category X'
  },
  {
    id: 'omeprazole',
    name: 'Prilosec',
    genericName: 'Omeprazole',
    category: 'Gastrointestinal (Proton Pump Inhibitor)',
    prescriptionRequired: false,
    uses: ['GERD and acid reflux', 'Gastric & duodenal ulcers', 'Zollinger-Ellison syndrome', 'H. pylori eradication protocol'],
    dosage: {
      adults: '20mg to 40mg once daily',
      children: '10mg to 20mg once daily under physician guidance',
      frequency: '30-60 minutes before morning breakfast'
    },
    sideEffects: {
      common: ['Headache', 'Abdominal pain', 'Constipation', 'Flatulence'],
      severe: ['Bone fracture risk (long-term high dose)', 'Clostridioides difficile infection', 'Hypomagnesemia']
    },
    warnings: [
      'Take capsule whole without chewing or crushing.',
      'Long-term use (> 1 year) requires calcium & B12 monitoring.'
    ],
    interactions: ['Clopidogrel', 'Ketoconazole', 'Methotrexate', 'St. John’s Wort'],
    storage: 'Protect from light and moisture.',
    pregnancySafety: 'Category C'
  }
];
