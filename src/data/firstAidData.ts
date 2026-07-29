export interface FirstAidGuide {
  id: string;
  title: string;
  category: 'Critical Emergency' | 'Trauma' | 'Environmental' | 'Medical Emergency';
  icon: string;
  urgency: 'HIGH' | 'CRITICAL' | 'MODERATE';
  summary: string;
  emergencyNumber: string;
  cprMetronomeBpm?: number;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    warning?: string;
  }[];
  doList: string[];
  dontList: string[];
}

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: 'cpr-adult',
    title: 'Adult CPR (Cardiopulmonary Resuscitation)',
    category: 'Critical Emergency',
    icon: 'HeartPulse',
    urgency: 'CRITICAL',
    summary: 'Life-saving technique used when someone’s breathing or heartbeat has stopped following cardiac arrest or drowning.',
    emergencyNumber: '911',
    cprMetronomeBpm: 105,
    steps: [
      {
        stepNumber: 1,
        title: 'Check Responsiveness & Call 911',
        description: 'Shout and tap the victim on the shoulder. If un-responsive, immediately call emergency services and get an AED if available.'
      },
      {
        stepNumber: 2,
        title: 'Position Hands on Center of Chest',
        description: 'Place the heel of one hand in the center of the chest. Interlock the fingers of your second hand on top. Keep elbows straight.'
      },
      {
        stepNumber: 3,
        title: 'Perform Rapid Hard Chest Compressions',
        description: 'Compress chest down 2 to 2.4 inches (5-6 cm) at a rate of 100 to 120 beats per minute to the beat of "Stayin Alive". Allow full chest recoil after each push.',
        warning: 'Do not interrupt compressions for more than 10 seconds.'
      },
      {
        stepNumber: 4,
        title: 'Give Rescue Breaths (If Trained)',
        description: 'After 30 compressions, tilt head back, pinch nose, and deliver 2 rescue breaths (1 second each) until chest rises. Repeat 30:2 ratio.'
      }
    ],
    doList: [
      'Push hard and fast in the center of the chest',
      'Use an Automated External Defibrillator (AED) as soon as it arrives',
      'Switch compression role every 2 minutes if multiple rescuers are present'
    ],
    dontList: [
      'Do not delay starting compressions to check pulse for more than 10 seconds',
      'Do not lean on the chest between compressions',
      'Do not stop until emergency services arrive'
    ]
  },
  {
    id: 'choking-adult',
    title: 'Choking (Heimlich Maneuver)',
    category: 'Critical Emergency',
    icon: 'AlertTriangle',
    urgency: 'CRITICAL',
    summary: 'Emergency abdominal thrust procedure for a choking conscious person whose airway is obstructed.',
    emergencyNumber: '911',
    steps: [
      {
        stepNumber: 1,
        title: 'Assess Airway Obstruction',
        description: 'Ask "Are you choking?" If the person cannot speak, cough loudly, or breathe and clutches their throat, act immediately.'
      },
      {
        stepNumber: 2,
        title: 'Position Yourself Behind Victim',
        description: 'Stand behind the person, wrap your arms around their waist, and lean them slightly forward.'
      },
      {
        stepNumber: 3,
        title: 'Make a Fist and Deliver Inward-Upward Thrusts',
        description: 'Place the thumb side of your fist just above the navel (well below ribcage). Grasp fist with other hand and thrust inward and upward rapidly.',
        warning: 'For pregnant or obese victims, perform chest thrusts on the lower breastbone instead of abdominal thrusts.'
      },
      {
        stepNumber: 4,
        title: 'Repeat Until Object Is Dislodged',
        description: 'Continue thrusts until the blocking object pops out or the person becomes unconscious (if unconscious, begin CPR).'
      }
    ],
    doList: [
      'Encourage coughing if the person can breathe or speak',
      'Perform inward and upward abdominal thrusts',
      'Lower person carefully to ground if they lose consciousness'
    ],
    dontList: [
      'Do not perform blind finger sweeps in the mouth',
      'Do not give water or liquids to a choking victim',
      'Do not slap the back of a standing choking adult unless trained in UK/European protocols'
    ]
  },
  {
    id: 'severe-bleeding',
    title: 'Severe Bleeding & Hemorrhage Control',
    category: 'Trauma',
    icon: 'ShieldAlert',
    urgency: 'HIGH',
    summary: 'Steps to stop life-threatening arterial or venous blood loss.',
    emergencyNumber: '911',
    steps: [
      {
        stepNumber: 1,
        title: 'Ensure Safety & Apply Direct Pressure',
        description: 'Put on gloves if available. Cover wound with sterile gauze or clean cloth and push down firmly with both hands.'
      },
      {
        stepNumber: 2,
        title: 'Maintain Constant Pressure',
        description: 'Keep firm continuous pressure on the wound. Do not lift cloth to check bleeding.'
      },
      {
        stepNumber: 3,
        title: 'Apply Tourniquet if Severe Limb Bleeding',
        description: 'If arterial spurting blood on an arm or leg does not stop with pressure, apply a commercial tourniquet 2-3 inches above wound site (not over joint) and tighten twist rod until bleeding stops.',
        warning: 'Note exact time tourniquet was applied on patient’s forehead (e.g. "TK 14:30").'
      }
    ],
    doList: [
      'Keep patient warm with blankets to prevent shock',
      'Elevate injured limb above heart level if no fracture is suspected',
      'Add additional cloth layers on top if blood soaks through'
    ],
    dontList: [
      'Do not remove original blood-soaked dressings',
      'Do not loosen tourniquet once applied',
      'Do not remove embedded foreign objects from wound'
    ]
  },
  {
    id: 'burns-treatment',
    title: 'Burns & Scalds Emergency Care',
    category: 'Trauma',
    icon: 'Flame',
    urgency: 'MODERATE',
    summary: 'Immediate care for thermal, chemical, or electrical skin burn injuries.',
    emergencyNumber: '911',
    steps: [
      {
        stepNumber: 1,
        title: 'Cool Burn Under Cool Running Water',
        description: 'Hold burned area under cool running tap water for at least 10 to 20 minutes immediately.'
      },
      {
        stepNumber: 2,
        title: 'Remove Constricting Items',
        description: 'Gently remove rings, watches, or tight clothing around burned area before swelling starts.'
      },
      {
        stepNumber: 3,
        title: 'Cover Loosely with Clean Non-Stick Dressing',
        description: 'Cover burn with sterile non-stick pad or clean plastic cling wrap to prevent infection.'
      }
    ],
    doList: [
      'Cool immediately with clean cool water',
      'Seek emergency help for burns larger than patient’s palm, or on face/hands/genitals'
    ],
    dontList: [
      'Do not apply ice, ice water, butter, oil, or toothpaste to burn',
      'Do not break blisters',
      'Do not remove clothing stuck to burned skin'
    ]
  }
];
