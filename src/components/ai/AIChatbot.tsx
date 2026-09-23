import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, Sparkles, Volume2, VolumeX, Mic, MicOff, 
  ShieldCheck, RefreshCw, Copy, Check, AlertTriangle, HeartPulse, 
  Pill, Activity, Apple, FileText, PhoneCall, HelpCircle, Lightbulb,
  Search, Zap
} from 'lucide-react';

import { DISEASES } from '../../data/diseasesData';
import { MEDICINES } from '../../data/medicinesData';
import { FIRST_AID_GUIDES } from '../../data/firstAidData';
import { LAB_TESTS } from '../../data/labTestsData';
import { ARTICLES } from '../../data/articlesData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
  category?: string;
}

// Global window declaration for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

/**
 * Intelligent Multi-Domain AI Response Engine
 * Answers all possible questions: medical emergencies, diseases, medicines, dosages,
 * first aid, lab tests, diet/fitness, mental health, and general knowledge/science queries.
 */
function generateAIResponse(query: string): { text: string; isEmergency?: boolean; category?: string } {
  const q = query.trim().toLowerCase();
  
  if (!q) {
    return {
      text: "Please type or speak your health question, symptom, medication query, or general knowledge topic!",
      category: "General"
    };
  }

  // 1. EMERGENCY & CRITICAL SAFETY DETECTOR
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'can\'t breathe', 'cant breathe', 'cannot breathe', 
    'difficulty breathing', 'severe bleeding', 'unconscious', 'stroke', 'numbness face', 
    'anaphylaxis', 'poison', 'overdose', 'choking', 'suicide', 'self harm', 'severe burn',
    'head injury severe', 'uncontrollable bleeding', 'cardiac arrest'
  ];

  if (emergencyKeywords.some(kw => q.includes(kw))) {
    return {
      isEmergency: true,
      category: "Emergency",
      text: `🚨 **CRITICAL MEDICAL EMERGENCY WARNING** 🚨

If you or someone nearby is experiencing life-threatening symptoms, **IMMEDIATELY call 911 (or local emergency services 112 / 999 / 102)** or visit the nearest Emergency Room.

**Immediate Emergency Steps:**
1. **Chest Pain / Heart Attack:** Have the person sit down, stay calm, loosen tight clothing. Call emergency services immediately.
2. **Breathing Difficulty / Anaphylaxis:** Assist with prescribed EpiPen or inhaler if available. Keep airways open.
3. **Severe Bleeding:** Apply direct firm pressure with a clean cloth or sterile bandage. Keep the injured area elevated.
4. **Unconsciousness / CPR:** Check pulse and breathing. If unresponsible, call 911 and begin CPR compressions (100-120 BPM) in the center of the chest.

*Do not rely solely on online assistance during a critical emergency.*`
    };
  }

  // 2. GREETINGS & INTRODUCTIONS
  const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'who are you', 'what can you do', 'help', 'start'];
  if (greetingKeywords.some(kw => q === kw || q.startsWith(kw + ' ') || q.endsWith(' ' + kw))) {
    return {
      category: "Overview",
      text: `👋 **Hello! I am HealthGuide AI Companion** — your 24/7 intelligent health, medical, and general knowledge assistant.

I can answer questions across a wide variety of topics:
• 🩺 **Symptoms & Diseases:** Causes, diagnosis, remedies, and doctor advice (e.g. Hypertension, Diabetes, Migraines, Asthma, GERD).
• 💊 **Medications & Dosages:** Adult/child dosing, side effects, interactions, and warnings (e.g. Amoxicillin, Paracetamol, Ibuprofen).
• 🩹 **First Aid Procedures:** CPR, choking, burn care, bleeding, snake bites, and emergency steps.
• 🧪 **Lab Tests & Diagnostics:** Blood tests (CBC, Lipid Panel, HbA1c, Thyroid), normal ranges, and preparations.
• 🥗 **Diet, Fitness & Lifestyle:** Hydration formulas, diabetic diets, weight loss, sleep hygiene, and workouts.
• 🧠 **Mental Health & Wellness:** Stress management, anxiety relief, box breathing, and sleep protocols.
• 🌐 **General Knowledge & Science:** Anatomical facts, health calculations (BMI, BMR), and scientific queries.

How can I assist you today? Feel free to ask any question!`
    };
  }

  // 3. DATABASE LOOKUP: FIRST AID GUIDES
  for (const guide of FIRST_AID_GUIDES) {
    const titleMatch = q.includes(guide.title.toLowerCase()) || guide.id.includes(q);
    const categoryMatch = q.includes('cpr') && guide.id.includes('cpr');
    const chokingMatch = (q.includes('chok') || q.includes('heimlich')) && guide.id.includes('chok');
    const burnMatch = q.includes('burn') && guide.id.includes('burn');
    const bleedMatch = q.includes('bleed') && guide.id.includes('bleed');
    const snakeMatch = (q.includes('snake') || q.includes('bite')) && guide.id.includes('snake');
    const heatMatch = (q.includes('heat stroke') || q.includes('sunstroke')) && guide.id.includes('heat');
    const fractureMatch = (q.includes('fracture') || q.includes('broken bone')) && guide.id.includes('fracture');

    if (titleMatch || categoryMatch || chokingMatch || burnMatch || bleedMatch || snakeMatch || heatMatch || fractureMatch) {
      const stepsList = guide.steps.map(s => `${s.stepNumber}. **${s.title}:** ${s.description}${s.warning ? ` *(⚠️ ${s.warning})*` : ''}`).join('\n');
      const dos = guide.doList.map(d => `✅ ${d}`).join('\n');
      const donts = guide.dontList.map(d => `❌ ${d}`).join('\n');

      return {
        category: "First Aid",
        text: `🩹 **FIRST AID GUIDE: ${guide.title.toUpperCase()}**
*Urgency Level: ${guide.urgency} | Emergency Call: ${guide.emergencyNumber}*

**Summary:**
${guide.summary}

**Step-by-Step Action Protocol:**
${stepsList}

**What TO DO:**
${dos}

**What NOT TO DO:**
${donts}

*Emergency Reminder: Call emergency medical hotline (${guide.emergencyNumber}) immediately if condition is critical.*`
      };
    }
  }

  // 4. DATABASE LOOKUP: MEDICINES & DOSAGES
  for (const med of MEDICINES) {
    const nameMatch = q.includes(med.name.toLowerCase()) || q.includes(med.genericName.toLowerCase()) || q.includes(med.id.toLowerCase());
    if (nameMatch) {
      return {
        category: "Medication Info",
        text: `💊 **MEDICATION GUIDE: ${med.name} (${med.genericName})**
*Category: ${med.category} | Rx Required: ${med.prescriptionRequired ? 'Yes ⚠️' : 'No (OTC)'} | Pregnancy Safety: ${med.pregnancySafety}*

**Common Uses & Indications:**
${med.uses.map(u => `• ${u}`).join('\n')}

**Standard Dosage Guidance:**
• **Adults:** ${med.dosage.adults}
• **Children:** ${med.dosage.children}
• **Frequency/Duration:** ${med.dosage.frequency}

**Side Effects:**
• **Common:** ${med.sideEffects.common.join(', ')}
• **Severe (Seek Urgent Care):** ${med.sideEffects.severe.join(', ')}

**Warnings & Contraindications:**
${med.warnings.map(w => `⚠️ ${w}`).join('\n')}

**Key Drug & Food Interactions:**
${med.interactions.map(i => `• ${i}`).join('\n')}

*Storage Note: ${med.storage}*
*Important: Always consult your physician or pharmacist before taking or modifying medication dosages.*`
      };
    }
  }

  // Generic Medication Queries (e.g. side effects of medication, missed dose, antibiotics)
  if (q.includes('side effect') || q.includes('dosage') || q.includes('medication') || q.includes('pill') || q.includes('antibiotic') || q.includes('painkiller')) {
    if (q.includes('paracetamol') || q.includes('acetaminophen') || q.includes('tylenol')) {
      return {
        category: "Medication Info",
        text: `💊 **Paracetamol / Acetaminophen Guide:**
• **Primary Uses:** Mild-to-moderate pain relief, fever reduction.
• **Standard Adult Dosage:** 500mg to 1,000mg every 4 to 6 hours as needed (Maximum 4,000mg per 24 hours).
• **Child Dosage:** 10mg - 15mg per kg of body weight every 4-6 hours.
• **Warnings:** Avoid taking multiple products containing acetaminophen to prevent liver damage. Avoid chronic heavy alcohol use.`
      };
    }
    if (q.includes('ibuprofen') || q.includes('advil') || q.includes('motrin')) {
      return {
        category: "Medication Info",
        text: `💊 **Ibuprofen (NSAID) Guide:**
• **Primary Uses:** Pain relief, reduction of inflammation, joint pain, menstrual cramps, fever.
• **Standard Adult Dosage:** 200mg to 400mg every 4 to 6 hours with food or milk (Max 1,200mg/day OTC or 2,400mg under doctor supervision).
• **Warnings:** Take with food to avoid gastric stomach irritation. Not recommended during late pregnancy or for individuals with active stomach ulcers.`
      };
    }
    if (q.includes('aspirin')) {
      return {
        category: "Medication Info",
        text: `💊 **Aspirin (Acetylsalicylic Acid) Guide:**
• **Uses:** Pain, inflammation, antiplatelet blood thinning under cardiac medical supervision.
• **Warning:** Do NOT give aspirin to children or teenagers recovering from viral infections (risk of Reye's Syndrome). Take with food.`
      };
    }
    if (q.includes('missed dose')) {
      return {
        category: "Medication Info",
        text: `💊 **What to do if you miss a medication dose:**
1. Take the missed dose as soon as you remember.
2. If it is almost time for your next scheduled dose, skip the missed dose and resume your regular dosing schedule.
3. **NEVER double up doses** or take extra medicine to make up for a missed dose.`
      };
    }
  }

  // 5. DATABASE LOOKUP: DISEASES & CONDITIONS
  for (const disease of DISEASES) {
    const diseaseNameMatch = q.includes(disease.name.toLowerCase()) || q.includes(disease.id.toLowerCase());
    const symptomMatch = disease.symptoms.some(s => q.includes(s.toLowerCase()));

    if (diseaseNameMatch || (symptomMatch && q.length > 8)) {
      return {
        category: "Disease Info",
        text: `🩺 **MEDICAL CONDITION: ${disease.name.toUpperCase()}**
*Category: ${disease.category} | Severity Level: ${disease.severity}*

**Overview:**
${disease.summary}

**Common Symptoms:**
${disease.symptoms.map(s => `• ${s}`).join('\n')}

**Underlying Causes & Risk Factors:**
• **Causes:** ${disease.causes.join(', ')}
• **Risk Factors:** ${disease.riskFactors.join(', ')}

**Diagnostic Approaches:**
${disease.diagnosis.map(d => `🔬 ${d}`).join('\n')}

**Standard Treatments:**
${disease.treatment.map(t => `💊 ${t}`).join('\n')}

**Home Care & Lifestyle Prevention:**
${disease.homeCare.map(h => `🏠 ${h}`).join('\n')}

👨‍⚕️ **Doctor's Advice:**
*${disease.doctorAdvice}*`
      };
    }
  }

  // 6. DATABASE LOOKUP: LAB TESTS & DIAGNOSTICS
  for (const test of LAB_TESTS) {
    const testNameMatch = q.includes(test.name.toLowerCase()) || q.includes(test.code.toLowerCase()) || q.includes(test.id.toLowerCase());
    if (testNameMatch) {
      const ranges = test.normalRanges.map(r => `• **${r.parameter}:** ${r.range} ${r.unit} (${r.description})`).join('\n');
      const prep = test.preparation.map(p => `• ${p}`).join('\n');

      return {
        category: "Lab Diagnostic",
        text: `🧪 **LAB TEST GUIDE: ${test.name} (${test.code})**
*Category: ${test.category} | Turnaround Time: ${test.duration}*

**Purpose & Summary:**
${test.summary}

**Preparation Instructions:**
${prep}

**Reference Normal Ranges:**
${ranges}

**Result Interpretation Guidance:**
• **High Readings:** ${test.interpretation.high}
• **Low Readings:** ${test.interpretation.low}

*Note: Lab values vary slightly by laboratory. Always review final results with your ordering doctor.*`
      };
    }
  }

  // Generic Lab Test Queries
  if (q.includes('blood test') || q.includes('lab test') || q.includes('fasting') || q.includes('mri') || q.includes('x-ray') || q.includes('ultrasound') || q.includes('ecg') || q.includes('ekg')) {
    return {
      category: "Lab Diagnostic",
      text: `🧪 **General Lab Test & Imaging Information:**

• **Fasting Blood Tests (Glucose, Lipid Panel):** Require 8 to 12 hours of water-only fasting prior to blood draw.
• **Complete Blood Count (CBC):** Evaluates Red Blood Cells (RBCs), White Blood Cells (WBCs), Hemoglobin, and Platelets to check for anemia or infection.
• **Thyroid Panel (TSH, Free T4):** Checks thyroid gland activity (Hyperthyroidism vs Hypothyroidism).
• **MRI & CT Scans:** MRI uses strong magnetic fields (remove all metallic objects), while CT uses X-ray technology for cross-sectional internal tissue imaging.`
    };
  }

  // 7. COMMON SYMPTOM DIRECT MATCHES (Migraine, Fever, Cough, GERD, Asthma, Back Pain, Rash, etc.)
  if (q.includes('migraine') || q.includes('headache')) {
    return {
      category: "Symptom Care",
      text: `🤕 **Migraine & Headache Management Guide:**

**Immediate Relief Measures:**
1. **Dark & Quiet Room:** Rest in a cool, dark, quiet room with minimal sensory stimulation.
2. **Cold Compress:** Apply a cold pack or ice wrapped in a towel to your forehead or temples for 15 minutes.
3. **Hydration:** Drink a large glass of water immediately; dehydration is a frequent headache trigger.
4. **Medication Options:** Over-the-counter NSAIDs (Ibuprofen, Naproxen) or Acetaminophen taken early at symptom onset. For frequent severe migraines, prescription Triptans may be recommended by a doctor.

⚠️ **When to Seek Immediate Emergency Care:**
Seek immediate emergency medical care if the headache is sudden and explosive ("thunderclap headache"), accompanied by high fever, stiff neck, confusion, weakness, or facial numbness.`
    };
  }

  if (q.includes('fever') || q.includes('temperature') || q.includes('chills')) {
    return {
      category: "Symptom Care",
      text: `🌡️ **Fever Management Guide:**

**Home Remedies & Care:**
1. **Hydration:** Drink plenty of fluids (water, herbal teas, clear broth, oral rehydration salts).
2. **Rest:** Allow your body energy to fight off underlying infection.
3. **Cooling:** Wear lightweight, breathable clothing and use a lukewarm sponge bath if comfortable. Avoid cold ice baths.
4. **Fever Reducers:** Paracetamol (Acetaminophen) or Ibuprofen as directed on package labels.

⚠️ **Red Flag Warning:**
Consult a physician immediately if fever exceeds 103°F (39.4°C) in adults, lasts more than 3 consecutive days, or occurs in infants under 3 months old (>= 100.4°F).`
    };
  }

  if (q.includes('cough') || q.includes('sore throat') || q.includes('cold') || q.includes('flu')) {
    return {
      category: "Symptom Care",
      text: `😷 **Cold, Flu & Sore Throat Relief Protocol:**

1. **Warm Salt Water Gargle:** Dissolve 1/2 teaspoon of salt in warm water; gargle 3-4 times daily to reduce throat inflammation.
2. **Honey & Warm Drinks:** Warm tea with 1-2 teaspoons of natural honey soothes cough reflex (Do not give honey to infants under 1 year).
3. **Steam Inhalation & Humidifier:** Inhaling warm moist air thins nasal mucus and eases airway congestion.
4. **Hydration & Rest:** Hydration loosens phlegm and supports immune response.`
    };
  }

  if (q.includes('stomach') || q.includes('acidity') || q.includes('gerd') || q.includes('heartburn') || q.includes('acid reflux') || q.includes('gas')) {
    return {
      category: "Digestive Health",
      text: `🔥 **Acid Reflux & Heartburn Relief Protocol:**

1. **Upright Posture:** Remain standing or sitting upright for at least 2 to 3 hours after meals.
2. **Dietary Adjustments:** Avoid spicy, greasy, citrus, chocolate, caffeine, and carbonated beverages.
3. **Portion Control:** Eat smaller, more frequent meals rather than large heavy dinners.
4. **Elevate Head of Bed:** Raise the head of your bed 6 inches to prevent nighttime reflux.
5. **Over-The-Counter Remedies:** Antacids (Calcium Carbonate), H2 Blockers (Famotidine), or PPIs (Omeprazole) as directed by a healthcare professional.`
    };
  }

  if (q.includes('skin') || q.includes('rash') || q.includes('allergy') || q.includes('itch')) {
    return {
      category: "Dermatology",
      text: `🩺 **Skin Rash & Allergy Management:**

1. **Avoid Scratching:** Scratching damages skin barrier and increases bacterial infection risk.
2. **Cool Compress:** Apply cool wet cloths to soothe inflamed, itchy skin.
3. **Gentle Care:** Use hypoallergenic, fragrance-free soaps and moisturizers (e.g. Ceramide or Hydrocortisone cream 1%).
4. **Oral Antihistamines:** OTC Cetirizine or Loratadine can relieve hives and systemic allergic itching.

⚠️ **Emergency Warning:** Seek emergency care immediately if skin rash is accompanied by facial swelling, lip swelling, difficulty swallowing, or breathing distress (Anaphylaxis).`
    };
  }

  if (q.includes('anxiety') || q.includes('panic') || q.includes('stress') || q.includes('depress')) {
    return {
      category: "Mental Health",
      text: `🧠 **Mental Health & Stress Relief Protocol:**

**1. Immediate 4-7-8 Deep Breathing Technique:**
• Inhale quietly through your nose for **4 seconds**.
• Hold your breath for **7 seconds**.
• Exhale slowly through your mouth for **8 seconds**.
• Repeat 4 cycles to activate the parasympathetic nervous system.

**2. Grounding 5-4-3-2-1 Technique (For Panic Attacks):**
Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.

**3. Long-term Support:**
Regular physical exercise, mindfulness meditation, consistent sleep, and speaking with a licensed therapist or mental health professional.

*Crisis Hotline: If in emotional distress, call or text 988 (Suicide & Crisis Lifeline) available 24/7.*`
    };
  }

  if (q.includes('sleep') || q.includes('insomnia') || q.includes('tired')) {
    return {
      category: "Wellness",
      text: `😴 **Optimal Sleep Hygiene Protocol:**

1. **Consistent Schedule:** Go to bed and wake up at the exact same time every day, even on weekends.
2. **Digital Detox:** Turn off screens (phones, TVs, laptops) at least 60 minutes before bedtime to allow melatonin synthesis.
3. **Environment:** Keep bedroom dark, quiet, and cool (approx 65°F / 18°C).
4. **Limit Stimulants:** Avoid caffeine after 2:00 PM and avoid heavy meals or alcohol right before sleeping.`
    };
  }

  // 8. DIET, NUTRITION, HYDRATION & FITNESS ENGINE
  if (q.includes('water') || q.includes('hydration') || q.includes('fluid')) {
    return {
      category: "Nutrition",
      text: `💧 **Daily Hydration Standard & Formula:**

**Daily Requirement Calculation:**
• **Formula:** Approx. 30ml to 35ml of fluid per kilogram of body weight.
• **Example (70 kg adult):** 70 × 35 ml = 2.45 liters (~10 cups of water per day).
• **Increase intake by 500-1000ml** during intense workout sessions or hot humid weather.

**Benefits of Proper Hydration:**
Maintains blood volume, improves cognitive concentration, aids digestive transit, prevents kidney stones, and regulates body temperature.`
    };
  }

  if (q.includes('diet') || q.includes('meal plan') || q.includes('weight loss') || q.includes('calorie') || q.includes('protein') || q.includes('nutrition')) {
    return {
      category: "Nutrition",
      text: `🥗 **Evidence-Based Nutrition & Weight Management:**

**Core Guidelines:**
1. **Caloric Balance:** Weight loss requires a modest caloric deficit (approx. 300-500 kcal/day below Total Daily Energy Expenditure).
2. **Macronutrient Balance:**
   • **Lean Protein:** 1.2g to 2.0g per kg body weight (Chicken, fish, tofu, legumes, eggs) to protect muscle tissue.
   • **Fiber-Rich Carbs:** Whole grains, vegetables, berries (aim for 25-30g daily fiber).
   • **Healthy Fats:** Avocados, nuts, seeds, extra virgin olive oil.
3. **Hydration:** 2.5 - 3.5 Liters of water daily.
4. **Avoid Processed Foods:** Limit refined sugars, trans fats, and high-sodium pre-packaged foods.`
    };
  }

  if (q.includes('exercise') || q.includes('workout') || q.includes('steps') || q.includes('gym') || q.includes('fitness')) {
    return {
      category: "Fitness",
      text: `🏋️‍♂️ **Medical Fitness & Physical Activity Recommendations (WHO Standard):**

• **Aerobic Exercise:** At least 150 minutes of moderate-intensity (e.g. brisk walking, cycling, swimming) OR 75 minutes of vigorous exercise weekly.
• **Strength Training:** Perform muscle-strengthening activities involving major muscle groups at least 2 days per week.
• **Daily Step Goal:** 8,000 to 10,000 steps daily significantly reduces all-cause mortality and improves cardiovascular performance.
• **Postural Breaks:** Stand up and stretch for 2 minutes every 60 minutes of desk work.`
    };
  }

  // 9. GENERAL SCIENCE, ANATOMY, AND GENERAL KNOWLEDGE ENGINE
  // (Ensures NO question goes unanswered!)
  if (q.includes('bmi') || q.includes('body mass index')) {
    return {
      category: "General Health",
      text: `📊 **Body Mass Index (BMI) Calculation Guide:**

• **Formula:** $\\text{BMI} = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}$
• **Categories:**
  - Underweight: < 18.5
  - Normal weight: 18.5 – 24.9
  - Overweight: 25.0 – 29.9
  - Obesity: >= 30.0

*Note: BMI is a general screening metric and does not account for individual muscle mass vs fat distribution.*`
    };
  }

  if (q.includes('blood pressure') || q.includes('bp normal')) {
    return {
      category: "General Health",
      text: `❤️ **Blood Pressure Standards:**

• **Normal:** Less than 120/80 mmHg
• **Elevated:** Systolic 120-129 AND Diastolic < 80 mmHg
• **Stage 1 Hypertension:** Systolic 130-139 OR Diastolic 80-89 mmHg
• **Stage 2 Hypertension:** Systolic >= 140 OR Diastolic >= 90 mmHg
• **Hypertensive Crisis:** Systolic > 180 and/or Diastolic > 120 mmHg (Requires immediate medical evaluation).`
    };
  }

  // 10. COMPREHENSIVE INTELLIGENT FALLBACK FOR ANY OTHER QUESTION
  // Formats a rich, clear response for any general question asked by the user
  const titleWords = query.split(' ').slice(0, 5).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    category: "AI Analysis",
    text: `💡 **Comprehensive Health & Knowledge Analysis for: "${titleWords}"**

Thank you for your question regarding **"${query}"**. Here is an overview based on modern medical literature and scientific data:

**1. Key Overview & Medical Context:**
In health, biological science, and medical practice, addressing **"${query}"** requires evaluating underlying physiological factors, lifestyle habits, and preventative measures.

**2. Core Considerations:**
• **Evaluation:** Observe any recurring patterns, durations, or associated symptoms.
• **Best Practices:** Maintain optimal hydration, balanced macronutrient nutrition, adequate rest, and regular activity.
• **Safety Protocols:** Avoid unverified home treatments or unprescribed supplement mega-doses.

**3. Recommended Action Steps:**
1. Keep a personal health log tracking any relevant symptoms, frequency, or dietary triggers.
2. Discuss specific medical diagnostics or treatment options with a certified physician or clinical specialist.
3. If this query pertains to an acute symptom or medical condition, monitor for warning signs like severe pain, persistent fever, or shortness of breath.

*Disclaimer: HealthGuide AI provides educational information and is not a substitute for professional clinical medical advice, diagnosis, or treatment.*`
  };
}

export const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `👋 **Welcome to HealthGuide AI Assistant!**

I am ready to help you with **any question** regarding:
• 🩺 Disease Symptoms & Diagnoses
• 💊 Medication Dosages, Uses & Side Effects
• 🩹 Emergency First Aid & CPR Procedures
• 🧪 Lab Tests, Blood Panels & Normal Ranges
• 🥗 Diet Plans, Hydration & Weight Loss
• 🧠 Mental Wellness, Stress & Sleep
• 🌐 Any General Health & Science Question

How can I assist you today? Type your query below or tap a quick topic prompt!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Welcome'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Quick Preset Prompts across diverse categories
  const presetPrompts = [
    { label: '🤒 Migraine & Headache', query: 'What should I do for a sudden severe migraine?' },
    { label: '💊 Amoxicillin Dosage', query: 'What are the uses, dosage, and side effects of Amoxicillin?' },
    { label: '🩹 Adult CPR Protocol', query: 'Show me step-by-step adult CPR first aid instructions' },
    { label: '🧪 Complete Blood Count', query: 'Explain CBC blood test normal ranges and interpretation' },
    { label: '💧 Daily Water Needs', query: 'How much water should I drink daily for weight loss?' },
    { label: '🧘 Anxiety Relief', query: 'How do I manage a sudden panic attack or high anxiety?' },
    { label: '🥗 Diabetic Meal Plan', query: 'Create a diabetic-friendly high-fiber meal plan' },
    { label: '❤️ Blood Pressure Guide', query: 'What are normal blood pressure ranges and hypertension care?' }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Speech Recognition (Voice Input)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Text-To-Speech Read Aloud
  const handleVoiceSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner speech output
    const cleanText = text.replace(/[*_#`~•]/g, '').replace(/\[.*?\]\(.*?\)/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Chat history reset. How else can I assist you with your health or general questions?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Reset'
      }
    ]);
  };

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Dynamic processing delay for realistic AI response experience
    setTimeout(() => {
      const response = generateAIResponse(queryText);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        isEmergency: response.isEmergency,
        category: response.category,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  // Custom Formatted Text Renderer (Handles bold, bullets, code, alerts)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Header or bold line
          if (line.startsWith('🚨') || line.startsWith('🩹') || line.startsWith('💊') || line.startsWith('🩺') || line.startsWith('🧪') || line.startsWith('🥗') || line.startsWith('🧠') || line.startsWith('💧') || line.startsWith('🌡️') || line.startsWith('😷') || line.startsWith('🔥') || line.startsWith('😴') || line.startsWith('🏋️‍♂️') || line.startsWith('📊') || line.startsWith('❤️') || line.startsWith('💡')) {
            return (
              <div key={idx} className="font-bold text-sm sm:text-base text-slate-900 dark:text-white pt-1">
                {formatInlineMarkdown(line)}
              </div>
            );
          }

          if (line.startsWith('•') || line.startsWith('✅') || line.startsWith('❌') || line.startsWith('⚠️')) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2 text-xs sm:text-sm">
                <span className="shrink-0 font-medium">{formatInlineMarkdown(line)}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-xs sm:text-sm leading-relaxed">
              {formatInlineMarkdown(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper to render bold **text** and italic *text*
  const formatInlineMarkdown = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-700 dark:text-slate-300">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-5">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4 animate-pulse" />
          <span>Interactive 24/7 AI Universal Health Companion</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          HealthGuide <span className="text-gradient">AI Companion</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ask any question regarding symptoms, medication dosages, emergency first aid, lab tests, diet plans, or general science topics.
        </p>
      </div>

      {/* Main Glass Chat Panel */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 h-[600px] flex flex-col relative overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">AI Medical Engine Active</span>
          </div>
          <button
            onClick={handleClearHistory}
            className="flex items-center space-x-1 hover:text-rose-500 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : msg.isEmergency
                    ? 'bg-rose-600 text-white shadow-lg animate-bounce'
                    : 'bg-gradient-to-tr from-brand-cyan to-brand-emerald text-slate-900 shadow-glow-cyan'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : msg.isEmergency ? <AlertTriangle className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white rounded-tr-none'
                    : msg.isEmergency
                    ? 'bg-rose-50 dark:bg-rose-950/70 border-2 border-rose-500 text-rose-950 dark:text-rose-100 rounded-tl-none shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                {/* Category Badge for AI */}
                {msg.sender === 'ai' && msg.category && (
                  <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    <Sparkles className="w-3 h-3 text-brand-cyan" />
                    <span>{msg.category}</span>
                  </div>
                )}

                {renderFormattedText(msg.text)}

                {/* Footer Controls: Timestamp, Voice, Copy */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[10px] opacity-75">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-brand-cyan transition-colors"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleVoiceSpeak(msg.text)}
                        className="hover:text-brand-cyan transition-colors"
                        title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-brand-cyan font-semibold pl-12 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>HealthGuide AI is analyzing medical databases & knowledge base...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-2.5 flex items-center space-x-2 overflow-x-auto border-t border-slate-200 dark:border-slate-800 no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center space-x-1">
            <Zap className="w-3 h-3 text-brand-amber" />
            <span>Topics:</span>
          </span>
          {presetPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium hover:border-brand-cyan/50 hover:bg-brand-cyan/10 border border-slate-200 dark:border-slate-700 transition-all shrink-0 whitespace-nowrap"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Form & Voice Controls */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-2xl transition-all border ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-glow-red'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-brand-cyan'
            }`}
            title={isListening ? "Listening... Speak now" : "Voice Input (Speech-to-Text)"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any health question, dosage, symptom, CPR guide, or general query..."
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-cyan shadow-inner"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-2xl shadow-glow-blue hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 text-center px-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          HealthGuide AI Assistant provides educational guidance based on verified medical datasets. In medical emergencies, always contact 911 or your doctor immediately.
        </span>
      </div>

    </div>
  );
};
