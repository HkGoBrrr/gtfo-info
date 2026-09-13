export interface OptOutMethod {
  brokerId: string;
  brokerName: string;
  method: "email" | "web_form" | "api" | "manual";
  email?: string;            // email address to send opt-out to
  webFormUrl?: string;       // direct link to opt-out form
  instructions?: string;     // steps for manual removal
  estimatedDays: number;     // typical processing time
}

export const OPT_OUT_METHODS: OptOutMethod[] = [
  {
    brokerId: "spokeo",
    brokerName: "Spokeo",
    method: "web_form",
    webFormUrl: "https://www.spokeo.com/optout",
    instructions: "Submit profile URL and email. Confirm via email link. Removal within 24-48 hours.",
    estimatedDays: 2,
  },
  {
    brokerId: "whitepages",
    brokerName: "Whitepages",
    method: "web_form",
    webFormUrl: "https://www.whitepages.com/suppression-requests",
    instructions: "Find your listing, click remove, verify via phone call. Removal within 24 hours.",
    estimatedDays: 1,
  },
  {
    brokerId: "truepeoplesearch",
    brokerName: "TruePeopleSearch",
    method: "web_form",
    webFormUrl: "https://www.truepeoplesearch.com/removal",
    instructions: "Find your listing, click remove, solve CAPTCHA. Removal within 24-72 hours.",
    estimatedDays: 3,
  },
  {
    brokerId: "fastpeoplesearch",
    brokerName: "FastPeopleSearch",
    method: "web_form",
    webFormUrl: "https://www.fastpeoplesearch.com/removal",
    instructions: "Find your listing, click remove. Removal within 24-48 hours.",
    estimatedDays: 2,
  },
  {
    brokerId: "beenverified",
    brokerName: "BeenVerified",
    method: "web_form",
    webFormUrl: "https://www.beenverified.com/app/optout/search",
    instructions: "Search for yourself, select listing, submit email for verification. Removal within 24 hours.",
    estimatedDays: 1,
  },
  {
    brokerId: "radaris",
    brokerName: "Radaris",
    method: "email",
    email: "support@radaris.com",
    instructions: "Email removal request with full name and listing URL. Removal within 7-14 days.",
    estimatedDays: 14,
  },
  {
    brokerId: "intelius",
    brokerName: "Intelius",
    method: "web_form",
    webFormUrl: "https://www.intelius.com/optout",
    instructions: "Submit name and email. Verify via email. Removal within 72 hours.",
    estimatedDays: 3,
  },
  {
    brokerId: "instantcheckmate",
    brokerName: "Instant Checkmate",
    method: "web_form",
    webFormUrl: "https://www.instantcheckmate.com/optout",
    instructions: "Search for listing, confirm identity, submit removal. Processing within 48 hours.",
    estimatedDays: 2,
  },
  {
    brokerId: "peoplefinder",
    brokerName: "PeopleFinder",
    method: "web_form",
    webFormUrl: "https://www.peoplefinder.com/optout.php",
    instructions: "Find your listing, click opt-out, verify email. Removal within 24-72 hours.",
    estimatedDays: 3,
  },
  {
    brokerId: "mylife",
    brokerName: "MyLife",
    method: "email",
    email: "privacy@mylife.com",
    instructions: "Email removal request with full name, DOB, and current address. Removal within 7-10 days.",
    estimatedDays: 10,
  },
  {
    brokerId: "thatsthem",
    brokerName: "ThatsThem",
    method: "web_form",
    webFormUrl: "https://thatsthem.com/optout",
    instructions: "Find listing, submit removal request. Removal within 24-72 hours.",
    estimatedDays: 3,
  },
  {
    brokerId: "nuwber",
    brokerName: "Nuwber",
    method: "email",
    email: "support@nuwber.com",
    instructions: "Email removal request with profile URL and full name. Removal within 7-14 days.",
    estimatedDays: 14,
  },
  {
    brokerId: "familytreenow",
    brokerName: "FamilyTreeNow",
    method: "web_form",
    webFormUrl: "https://www.familytreenow.com/optout",
    instructions: "Find your listing, click opt-out. Removal within 48 hours.",
    estimatedDays: 2,
  },
  {
    brokerId: "voterrecords",
    brokerName: "VoterRecords.com",
    method: "email",
    email: "admin@voterrecords.com",
    instructions: "Email removal request with full name, state, and listing URL. Removal within 7-30 days.",
    estimatedDays: 30,
  },
];

export function generateOptOutEmail(
  brokerName: string,
  profile: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dateOfBirth?: string;
  }
): { subject: string; body: string } {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const fullAddress = `${profile.address}, ${profile.city}, ${profile.state} ${profile.zip}`;

  return {
    subject: `Data Removal Request — ${fullName}`,
    body: `To Whom It May Concern,

I am writing to request the immediate removal of my personal information from your database and website, pursuant to applicable privacy laws including the California Consumer Privacy Act (CCPA) and similar state privacy regulations.

Personal Information to Remove:
- Full Name: ${fullName}
- Address: ${fullAddress}${profile.dateOfBirth ? `\n- Date of Birth: ${profile.dateOfBirth}` : ""}

I request that you:
1. Remove all personal information associated with my name and the details above from your website and databases
2. Confirm the removal via email once completed
3. Refrain from re-listing or re-publishing my information in the future

Please process this request within 30 days as required by applicable law. If you need any additional information to verify my identity and process this request, please contact me at this email address.

Thank you for your prompt attention to this matter.

Sincerely,
${fullName}

This request was submitted on behalf of ${fullName} via GTFO Info (gtfoinfo.com), an authorized personal data removal service.`,
  };
}
