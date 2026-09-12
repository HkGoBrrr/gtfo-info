export interface Broker {
  id: string;
  name: string;
  type: string;
  url: string;
  searchUrl: string | null; // null = can't auto-check yet
  dataTypes: string[];
  optOutUrl: string | null;
  difficulty: "easy" | "medium" | "hard";
  status: "live" | "coming_soon";
}

// Brokers we can actually check (public search pages)
export const LIVE_BROKERS: Broker[] = [
  {
    id: "spokeo",
    name: "Spokeo",
    type: "People search",
    url: "https://www.spokeo.com",
    searchUrl: "https://www.spokeo.com/search?q=",
    dataTypes: ["Full name", "Address", "Phone", "Email", "Relatives", "Social profiles"],
    optOutUrl: "https://www.spokeo.com/optout",
    difficulty: "easy",
    status: "live",
  },
  {
    id: "whitepages",
    name: "Whitepages",
    type: "People search",
    url: "https://www.whitepages.com",
    searchUrl: "https://www.whitepages.com/name/",
    dataTypes: ["Full name", "Current address", "Phone", "Age"],
    optOutUrl: "https://www.whitepages.com/suppression-requests",
    difficulty: "medium",
    status: "live",
  },
  {
    id: "truepeoplesearch",
    name: "TruePeopleSearch",
    type: "People search",
    url: "https://www.truepeoplesearch.com",
    searchUrl: "https://www.truepeoplesearch.com/results?name=",
    dataTypes: ["Full name", "Address", "Phone", "Relatives", "Email"],
    optOutUrl: "https://www.truepeoplesearch.com/removal",
    difficulty: "easy",
    status: "live",
  },
  {
    id: "fastpeoplesearch",
    name: "FastPeopleSearch",
    type: "People search",
    url: "https://www.fastpeoplesearch.com",
    searchUrl: "https://www.fastpeoplesearch.com/name/",
    dataTypes: ["Full name", "Address", "Phone", "Relatives"],
    optOutUrl: "https://www.fastpeoplesearch.com/removal",
    difficulty: "easy",
    status: "live",
  },
  {
    id: "beenverified",
    name: "BeenVerified",
    type: "Background check",
    url: "https://www.beenverified.com",
    searchUrl: "https://www.beenverified.com/people/",
    dataTypes: ["Full name", "Address history", "Phone", "Email", "Associates", "Criminal records"],
    optOutUrl: "https://www.beenverified.com/app/optout/search",
    difficulty: "medium",
    status: "live",
  },
  {
    id: "radaris",
    name: "Radaris",
    type: "People search",
    url: "https://radaris.com",
    searchUrl: "https://radaris.com/p/",
    dataTypes: ["Full name", "Address", "Phone", "Property records", "Court records"],
    optOutUrl: "https://radaris.com/control/privacy",
    difficulty: "hard",
    status: "live",
  },
  {
    id: "intelius",
    name: "Intelius",
    type: "People search",
    url: "https://www.intelius.com",
    searchUrl: "https://www.intelius.com/people-search/",
    dataTypes: ["Full name", "Address", "Phone", "Age", "Relatives"],
    optOutUrl: "https://www.intelius.com/optout",
    difficulty: "medium",
    status: "live",
  },
  {
    id: "instantcheckmate",
    name: "Instant Checkmate",
    type: "Background check",
    url: "https://www.instantcheckmate.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Criminal records", "Associates"],
    optOutUrl: "https://www.instantcheckmate.com/optout",
    difficulty: "medium",
    status: "live",
  },
  {
    id: "ussearch",
    name: "USSearch",
    type: "People search",
    url: "https://www.ussearch.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Email"],
    optOutUrl: null,
    difficulty: "hard",
    status: "live",
  },
  {
    id: "peoplefinder",
    name: "PeopleFinder",
    type: "People search",
    url: "https://www.peoplefinder.com",
    searchUrl: "https://www.peoplefinder.com/results.php?name=",
    dataTypes: ["Full name", "Address", "Phone", "Age", "Relatives"],
    optOutUrl: "https://www.peoplefinder.com/optout.php",
    difficulty: "easy",
    status: "live",
  },
];

// Brokers we know about but haven't built checkers for yet — the demo/roadmap
export const COMING_SOON_BROKERS: Broker[] = [
  {
    id: "mylife",
    name: "MyLife",
    type: "Reputation",
    url: "https://www.mylife.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Reputation score", "Court records"],
    optOutUrl: null,
    difficulty: "hard",
    status: "coming_soon",
  },
  {
    id: "thatsthem",
    name: "ThatsThem",
    type: "People search",
    url: "https://thatsthem.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Email", "IP address"],
    optOutUrl: null,
    difficulty: "medium",
    status: "coming_soon",
  },
  {
    id: "cyberbackgroundchecks",
    name: "CyberBackgroundChecks",
    type: "Background check",
    url: "https://www.cyberbackgroundchecks.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Criminal records", "Bankruptcies"],
    optOutUrl: null,
    difficulty: "medium",
    status: "coming_soon",
  },
  {
    id: "publicrecordsnow",
    name: "PublicRecordsNow",
    type: "Public records",
    url: "https://www.publicrecordsnow.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Court records", "Property records"],
    optOutUrl: null,
    difficulty: "hard",
    status: "coming_soon",
  },
  {
    id: "peoplesearchnow",
    name: "PeopleSearchNow",
    type: "People search",
    url: "https://www.peoplesearchnow.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Email"],
    optOutUrl: null,
    difficulty: "easy",
    status: "coming_soon",
  },
  {
    id: "addresses",
    name: "Addresses.com",
    type: "People search",
    url: "https://www.addresses.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone"],
    optOutUrl: null,
    difficulty: "easy",
    status: "coming_soon",
  },
  {
    id: "familytreenow",
    name: "FamilyTreeNow",
    type: "Genealogy / People search",
    url: "https://www.familytreenow.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Relatives", "Birth records"],
    optOutUrl: null,
    difficulty: "medium",
    status: "coming_soon",
  },
  {
    id: "clustrmaps",
    name: "ClustrMaps",
    type: "People search",
    url: "https://clustrmaps.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Relatives", "Associates"],
    optOutUrl: null,
    difficulty: "medium",
    status: "coming_soon",
  },
  {
    id: "nuwber",
    name: "Nuwber",
    type: "People search",
    url: "https://nuwber.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Email", "Social profiles"],
    optOutUrl: null,
    difficulty: "medium",
    status: "coming_soon",
  },
  {
    id: "searchpeoplefree",
    name: "SearchPeopleFree",
    type: "People search",
    url: "https://www.searchpeoplefree.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone", "Relatives"],
    optOutUrl: null,
    difficulty: "easy",
    status: "coming_soon",
  },
  {
    id: "locatepeople",
    name: "LocatePeople",
    type: "People search",
    url: "https://www.locatepeople.org",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Phone"],
    optOutUrl: null,
    difficulty: "easy",
    status: "coming_soon",
  },
  {
    id: "advancedbackgroundchecks",
    name: "AdvancedBackgroundChecks",
    type: "Background check",
    url: "https://www.advancedbackgroundchecks.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Criminal records", "Bankruptcies", "Liens"],
    optOutUrl: null,
    difficulty: "hard",
    status: "coming_soon",
  },
  {
    id: "neighbor",
    name: "Neighbor.Report",
    type: "Address search",
    url: "https://neighbor.report",
    searchUrl: null,
    dataTypes: ["Address", "Property records", "Neighbors", "Sex offender data"],
    optOutUrl: null,
    difficulty: "hard",
    status: "coming_soon",
  },
  {
    id: "voterrecords",
    name: "VoterRecords.com",
    type: "Voter records",
    url: "https://voterrecords.com",
    searchUrl: null,
    dataTypes: ["Full name", "Address", "Party affiliation", "Voting history"],
    optOutUrl: null,
    difficulty: "hard",
    status: "coming_soon",
  },
];

export const ALL_BROKERS = [...LIVE_BROKERS, ...COMING_SOON_BROKERS];

export const BROKER_COUNT = ALL_BROKERS.length;

export function getRiskLevel(foundCount: number): "low" | "medium" | "high" | "critical" {
  if (foundCount <= 2) return "low";
  if (foundCount <= 5) return "medium";
  if (foundCount <= 10) return "high";
  return "critical";
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case "low": return "#00e676";
    case "medium": return "#ff9100";
    case "high": return "#ff3d3d";
    case "critical": return "#ff3d3d";
    default: return "#ff9100";
  }
}
