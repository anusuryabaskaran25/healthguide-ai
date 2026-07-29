export interface Disease {
  id: string;
  name: string;
  category: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  image: string;
  summary: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  diagnosis: string[];
  treatment: string[];
  prevention: string[];
  homeCare: string[];
  doctorAdvice: string;
  faqs: { question: string; answer: string }[];
  relatedDiseases: string[];
}

export const DISEASES: Disease[] = [
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Cardiology',
    severity: 'Moderate',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    summary: 'A long-term medical condition in which the blood pressure in the arteries is persistently elevated above 130/80 mmHg.',
    symptoms: ['Morning headaches', 'Shortness of breath', 'Nosebleeds', 'Dizziness', 'Chest pain', 'Visual changes'],
    causes: ['High sodium diet', 'Lack of physical activity', 'Genetics', 'Chronic stress', 'Obesity', 'Excessive alcohol intake'],
    riskFactors: ['Age over 55', 'Family history', 'Smoking', 'Diabetes', 'High cholesterol'],
    diagnosis: ['Sphygmomanometer blood pressure checks', 'Ambulatory BP monitoring', 'Echocardiogram', 'Lipid panel blood test'],
    treatment: ['ACE Inhibitors / ARBs', 'Beta blockers', 'Calcium channel blockers', 'Lifestyle modifications'],
    prevention: ['Reduce dietary sodium (< 2,000mg/day)', 'Exercise 150 mins/week', 'Maintain healthy BMI', 'Limit alcohol'],
    homeCare: ['Daily BP log tracking', 'DASH diet compliance', 'Stress reduction meditation', 'Adequate hydration'],
    doctorAdvice: 'Seek immediate emergency medical care if systolic blood pressure exceeds 180 mmHg with severe headache or chest pain.',
    faqs: [
      { question: 'Can hypertension be cured completely?', answer: 'Hypertension cannot usually be cured, but it can be controlled extremely effectively through medicine and lifestyle habits.' },
      { question: 'What is white coat hypertension?', answer: 'It is a condition where a patient experiences elevated blood pressure in clinical settings due to anxiety.' }
    ],
    relatedDiseases: ['Coronary Artery Disease', 'Heart Failure', 'Stroke']
  },
  {
    id: 'type-2-diabetes',
    name: 'Type 2 Diabetes Mellitus',
    category: 'Endocrinology',
    severity: 'Severe',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    summary: 'A chronic metabolic disorder characterized by high blood glucose resulting from insulin resistance and relative insulin deficiency.',
    symptoms: ['Increased thirst (polydipsia)', 'Frequent urination (polyuria)', 'Unexplained weight loss', 'Blurred vision', 'Slow-healing sores', 'Fatigue'],
    causes: ['Insulin resistance in muscle and fat cells', 'Pancreatic beta-cell dysfunction', 'Genetic predisposition', 'Sedentary lifestyle'],
    riskFactors: ['Overweight/Obesity', 'Age 45 or older', 'Physical inactivity', 'Gestational diabetes history', 'Polycystic ovary syndrome (PCOS)'],
    diagnosis: ['HbA1c test (>= 6.5%)', 'Fasting Plasma Glucose (>= 126 mg/dL)', 'Oral Glucose Tolerance Test'],
    treatment: ['Metformin therapy', 'SGLT2 inhibitors / GLP-1 receptor agonists', 'Insulin therapy (when required)', 'Carbohydrate counting'],
    prevention: ['Maintain healthy weight', 'Consume high-fiber, low-glycemic foods', 'Regular aerobic & resistance training'],
    homeCare: ['Continuous glucose monitoring (CGM)', 'Daily foot inspections', 'Ketone testing during illness'],
    doctorAdvice: 'Consult your endocrinologist if fasting blood sugar remains consistently above 180 mg/dL or if experiencing hypoglycemic episodes (< 70 mg/dL).',
    faqs: [
      { question: 'Is Type 2 Diabetes reversible?', answer: 'With significant weight loss and dietary changes, many patients achieve remission where blood sugar stays normal without medication.' }
    ],
    relatedDiseases: ['Diabetic Neuropathy', 'Diabetic Retinopathy', 'Chronic Kidney Disease']
  },
  {
    id: 'asthma',
    name: 'Bronchial Asthma',
    category: 'Pulmonology',
    severity: 'Moderate',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    summary: 'A condition in which airway passages narrow, swell, and produce extra mucus, causing breathing difficulties.',
    symptoms: ['Wheezing sound during expiration', 'Shortness of breath', 'Chest tightness', 'Coughing fits (especially at night)'],
    causes: ['Airborne allergens (pollen, dust mites, pet dander)', 'Respiratory infections', 'Cold air exposure', 'Physical exertion', 'Air pollutants'],
    riskFactors: ['Family history of asthma/allergies', 'Atopic dermatitis', 'Exposure to secondhand smoke', 'Occupational chemical exposure'],
    diagnosis: ['Spirometry lung function test', 'Peak expiratory flow (PEF) meter', 'Methacholine challenge test'],
    treatment: ['Inhaled Corticosteroids (ICS)', 'Short-acting Beta Agonists (Albuterol rescue inhaler)', 'Leukotriene modifiers', 'Biologic therapies'],
    prevention: ['Identify and eliminate trigger allergens', 'HEPA air filter usage', 'Annual influenza vaccination'],
    homeCare: ['Follow written Asthma Action Plan', 'Monitor daily peak flow readings', 'Rinse mouth after steroid inhaler use'],
    doctorAdvice: 'Seek emergency assistance immediately if rescue inhaler gives no relief after 15 minutes or if fingernails/lips turn bluish.',
    faqs: [
      { question: 'Can children outgrow asthma?', answer: 'Some children see symptoms diminish significantly as airways enlarge during puberty, though hyper-reactivity may remain.' }
    ],
    relatedDiseases: ['COPD', 'Allergic Rhinitis', 'Gastroesophageal Reflux Disease (GERD)']
  },
  {
    id: 'migraine',
    name: 'Migraine Headache',
    category: 'Neurology',
    severity: 'Moderate',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    summary: 'A neurological condition causing intense throbbing or pulsating pain, usually on one side of the head, accompanied by sensory sensitivity.',
    symptoms: ['Throbbing unilateral headache', 'Photophobia (light sensitivity)', 'Phonophobia (sound sensitivity)', 'Nausea & vomiting', 'Visual aura (flashing lights/zigzag lines)'],
    causes: ['Neurovascular inflammation', 'Fluctuations in serotonin levels', 'Hormonal changes in women', 'Sleep disruption', 'Dehydration'],
    riskFactors: ['Family history', 'Female gender (3x more common)', 'High stress levels', 'Caffeine withdrawal or overuse'],
    diagnosis: ['Neurological examination', 'Brain MRI/CT scan to rule out organic lesions', 'Headache journal analysis'],
    treatment: ['Triptans (Sumatriptan)', 'CGRP inhibitors', 'NSAIDs / Acetaminophen', 'Propranolol or Topiramate for prevention'],
    prevention: ['Maintain regular sleep schedule', 'Stay hydrated (2.5L water/day)', 'Avoid trigger foods (aged cheese, MSG, artificial sweeteners)'],
    homeCare: ['Rest in a cool, quiet, pitch-dark room', 'Cold compress applied to forehead or nape', 'Hydrated ginger tea'],
    doctorAdvice: 'Consult a doctor if migraines occur more than 4 times per month or if headache onset is sudden and explosive (thunderclap headache).',
    faqs: [
      { question: 'What is a migraine aura?', answer: 'An aura is a set of visual or sensory warning signs (like seeing spots or feeling tingling) that occurs before the headache starts.' }
    ],
    relatedDiseases: ['Tension Headache', 'Cluster Headache', 'Sinusitis']
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    category: 'Gastroenterology',
    severity: 'Mild',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80',
    summary: 'A digestive disease in which stomach acid or bile irritates the food pipe lining, causing heartburn and acid regurgitation.',
    symptoms: ['Burning chest pain (heartburn)', 'Acid regurgitation', 'Difficulty swallowing (dysphagia)', 'Sensation of lump in throat', 'Chronic dry cough'],
    causes: ['Lower esophageal sphincter (LES) relaxation', 'Hiatal hernia', 'Delayed gastric emptying', 'Increased intra-abdominal pressure'],
    riskFactors: ['Obesity', 'Pregnancy', 'Smoking', 'Eating large meals late at night', 'Fried and spicy food consumption'],
    diagnosis: ['Upper GI Endoscopy (EGD)', 'Esophageal pH monitoring', 'Barium swallow X-ray'],
    treatment: ['Proton Pump Inhibitors (PPIs like Omeprazole)', 'H2 Receptor Antagonists', 'Antacids', 'Fundoplication surgery (severe cases)'],
    prevention: ['Elevate head of bed by 6 inches', 'Avoid lying down within 3 hours of eating', 'Avoid citrus, chocolate, mint, and alcohol'],
    homeCare: ['Eat smaller, frequent meals', 'Chew food thoroughly', 'Maintain upright posture post-meals'],
    doctorAdvice: 'Contact a physician if swallowing becomes painful or if vomiting blood/dark stools occurs.',
    faqs: [
      { question: 'Can GERD damage the esophagus?', answer: 'Yes, untreated chronic acid exposure can cause esophageal strictures, ulcers, or Barrett’s esophagus.' }
    ],
    relatedDiseases: ['Peptic Ulcer Disease', 'Gastritis', 'Barrett Esophagus']
  },
  {
    id: 'depression',
    name: 'Major Depressive Disorder (MDD)',
    category: 'Mental Health',
    severity: 'Severe',
    image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=600&q=80',
    summary: 'A mood disorder causing a persistent feeling of sadness and loss of interest, affecting how you feel, think, and handle daily activities.',
    symptoms: ['Persistent sad or empty mood', 'Loss of interest in hobbies (anhedonia)', 'Fatigue and low energy', 'Insomnia or hypersomnia', 'Changes in appetite', 'Difficulty concentrating'],
    causes: ['Neurotransmitter imbalances (serotonin, dopamine)', 'Genetic vulnerability', 'Major life trauma or loss', 'Chronic illness'],
    riskFactors: ['Personal or family history of mental illness', 'Substance abuse', 'Chronic physical illness', 'Lack of social support'],
    diagnosis: ['DSM-5 clinical psychological evaluation', 'PHQ-9 depression screening tool', 'Blood tests to rule out thyroid dysfunction'],
    treatment: ['Cognitive Behavioral Therapy (CBT)', 'Selective Serotonin Reuptake Inhibitors (SSRIs)', 'SNRI medications', 'Mindfulness & Support groups'],
    prevention: ['Regular physical exercise', 'Strong social connections', 'Stress management techniques', 'Adequate sleep hygiene'],
    homeCare: ['Daily light physical activity', 'Journaling', 'Maintain a structured routine', 'Reach out to trusted loved ones'],
    doctorAdvice: 'If you or someone you know is having thoughts of self-harm, immediately contact emergency services or call/text 988.',
    faqs: [
      { question: 'How long does antidepressant medication take to work?', answer: 'Most SSRIs require 2 to 6 weeks of continuous daily use before full therapeutic benefits are experienced.' }
    ],
    relatedDiseases: ['Generalized Anxiety Disorder', 'Bipolar Disorder', 'Burnout Syndrome']
  }
];
