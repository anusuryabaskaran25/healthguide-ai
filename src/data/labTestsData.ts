export interface LabTest {
  id: string;
  name: string;
  code: string;
  category: 'Hematology' | 'Biochemistry' | 'Endocrinology' | 'Imaging' | 'Cardiology';
  summary: string;
  preparation: string[];
  normalRanges: { parameter: string; range: string; unit: string; description: string }[];
  interpretation: {
    high: string;
    low: string;
  };
  duration: string;
}

export const LAB_TESTS: LabTest[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    code: 'LAB-101',
    category: 'Hematology',
    summary: 'Evaluates overall health and detects a wide range of disorders including anemia, infection, and leukemia.',
    preparation: ['No fasting required for isolated CBC', 'Stay normally hydrated with water'],
    normalRanges: [
      { parameter: 'Hemoglobin (Hb)', range: '13.5 - 17.5 (Male) / 12.0 - 15.5 (Female)', unit: 'g/dL', description: 'Oxygen carrying protein in red blood cells' },
      { parameter: 'White Blood Cell (WBC)', range: '4,500 - 11,000', unit: '/mcL', description: 'Immune defense defender cells' },
      { parameter: 'Platelets', range: '150,000 - 450,000', unit: '/mcL', description: 'Blood clotting cells' },
      { parameter: 'Hematocrit', range: '41% - 50% (Male) / 36% - 48% (Female)', unit: '%', description: 'Percentage of blood composed of RBCs' }
    ],
    interpretation: {
      high: 'High WBC suggests active bacterial infection or inflammation; high RBC/Hb indicates polycythemia or dehydration.',
      low: 'Low Hb/RBC indicates anemia; low WBC indicates leukopenia or bone marrow suppression; low platelets increase bleeding risk.'
    },
    duration: '2 - 4 hours'
  },
  {
    id: 'lipid-profile',
    name: 'Comprehensive Lipid Profile',
    code: 'LAB-204',
    category: 'Biochemistry',
    summary: 'Measures blood cholesterol and triglyceride levels to assess cardiovascular disease risk.',
    preparation: ['10 - 12 hours overnight fasting required (water permitted)', 'Avoid alcohol 24 hours prior'],
    normalRanges: [
      { parameter: 'Total Cholesterol', range: '< 200', unit: 'mg/dL', description: 'Combined blood cholesterol score' },
      { parameter: 'HDL (Good Cholesterol)', range: '> 40 (Male) / > 50 (Female)', unit: 'mg/dL', description: 'Protective high-density lipoprotein' },
      { parameter: 'LDL (Bad Cholesterol)', range: '< 100', unit: 'mg/dL', description: 'Atherogenic low-density lipoprotein' },
      { parameter: 'Triglycerides', range: '< 150', unit: 'mg/dL', description: 'Blood fat energy storage' }
    ],
    interpretation: {
      high: 'Elevated LDL & Triglycerides increase risk of arterial plaque buildup, heart attack, and stroke.',
      low: 'Low HDL reduces cardiovascular protection; severely low Total Cholesterol can indicate malnutrition or hyperthyroidism.'
    },
    duration: '6 - 12 hours'
  },
  {
    id: 'thyroid-panel',
    name: 'Thyroid Function Panel (TSH, Free T3, Free T4)',
    code: 'LAB-309',
    category: 'Endocrinology',
    summary: 'Evaluates pituitary and thyroid gland hormone regulation controlling metabolism, temperature, and heart rate.',
    preparation: ['Morning blood draw recommended', 'Inform technician if taking biotin supplements (may interfere with TSH assay)'],
    normalRanges: [
      { parameter: 'TSH (Thyroid Stimulating Hormone)', range: '0.4 - 4.0', unit: 'mIU/L', description: 'Pituitary gland control signal' },
      { parameter: 'Free T4 (Thyroxine)', range: '0.8 - 1.8', unit: 'ng/dL', description: 'Active circulating thyroid hormone' },
      { parameter: 'Free T3 (Triiodothyronine)', range: '2.3 - 4.2', unit: 'pg/mL', description: 'Potent tissue metabolism active hormone' }
    ],
    interpretation: {
      high: 'High TSH with low Free T4 indicates Primary Hypothyroidism (sluggish thyroid); high Free T4 with low TSH indicates Hyperthyroidism.',
      low: 'Low TSH with high Free T4 signals Hyperthyroidism (Graves disease); low TSH & Free T4 indicates central secondary hypothyroidism.'
    },
    duration: '12 - 24 hours'
  },
  {
    id: 'ecg-resting',
    name: '12-Lead Electrocardiogram (ECG / EKG)',
    code: 'IMG-501',
    category: 'Cardiology',
    summary: 'Records the electrical signals in your heart to check for arrhythmia, ischemia, or structural heart changes.',
    preparation: ['Avoid oily skin lotions before test', 'Wear easily removable upper garments'],
    normalRanges: [
      { parameter: 'Heart Rate', range: '60 - 100', unit: 'bpm', description: 'Resting cardiac sinus rhythm' },
      { parameter: 'PR Interval', range: '120 - 200', unit: 'ms', description: 'Atrioventricular conduction time' },
      { parameter: 'QRS Duration', range: '80 - 100', unit: 'ms', description: 'Ventricular depolarization time' }
    ],
    interpretation: {
      high: 'ST-segment elevation indicates acute myocardial infarction (heart attack); prolonged QRS indicates bundle branch block.',
      low: 'Bradycardia (< 60 bpm) may be physiological in trained athletes or indicate sinus node dysfunction.'
    },
    duration: 'Immediate (15 mins)'
  }
];
