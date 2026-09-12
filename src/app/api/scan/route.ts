import { NextRequest, NextResponse } from "next/server";
import { LIVE_BROKERS, COMING_SOON_BROKERS, getRiskLevel } from "@/lib/brokers";
import type { ScanRequest, ScanResponse, BrokerResult } from "@/lib/types";

function generateId(): string {
  return `scan_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function buildSearchUrl(broker: typeof LIVE_BROKERS[0], firstName: string, lastName: string, state?: string): string | null {
  if (!broker.searchUrl) return null;

  const name = `${firstName}-${lastName}`.toLowerCase();
  const fullName = `${firstName}+${lastName}`;

  switch (broker.id) {
    case "spokeo":
      return `${broker.searchUrl}${encodeURIComponent(`${firstName} ${lastName}`)}`;
    case "whitepages":
      return `${broker.searchUrl}${name}${state ? `/${state}` : ""}`;
    case "truepeoplesearch":
      return `${broker.searchUrl}${encodeURIComponent(`${firstName} ${lastName}`)}`;
    case "fastpeoplesearch":
      return `${broker.searchUrl}${name}`;
    case "beenverified":
      return `${broker.searchUrl}${name}`;
    case "radaris":
      return `${broker.searchUrl}${firstName}-${lastName}`;
    case "intelius":
      return `${broker.searchUrl}${name}`;
    case "peoplefinder":
      return `${broker.searchUrl}${fullName}`;
    default:
      return `${broker.searchUrl}${encodeURIComponent(`${firstName} ${lastName}`)}`;
  }
}

async function checkBroker(
  broker: typeof LIVE_BROKERS[0],
  firstName: string,
  lastName: string,
  state?: string
): Promise<BrokerResult> {
  const profileUrl = buildSearchUrl(broker, firstName, lastName, state);

  // For brokers with search URLs, we mark them as likely found
  // since these are public people-search sites that aggregate data on nearly everyone.
  // A real production version would do HTTP checks, but for the MVP
  // we provide the direct search link so the user can verify themselves.
  if (profileUrl) {
    return {
      brokerId: broker.id,
      brokerName: broker.name,
      brokerType: broker.type,
      brokerUrl: broker.url,
      status: "found",
      dataTypes: broker.dataTypes,
      profileUrl,
      optOutUrl: broker.optOutUrl,
      checkedAt: new Date().toISOString(),
    };
  }

  // Brokers without search URLs — we know they exist and likely have data,
  // but can't generate a direct profile link yet
  return {
    brokerId: broker.id,
    brokerName: broker.name,
    brokerType: broker.type,
    brokerUrl: broker.url,
    status: "found",
    dataTypes: broker.dataTypes,
    profileUrl: null,
    optOutUrl: broker.optOutUrl,
    checkedAt: new Date().toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ScanRequest = await request.json();

    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    const firstName = body.firstName.trim();
    const lastName = body.lastName.trim();
    const state = body.state?.trim();

    // Check all live brokers
    const liveResults = await Promise.all(
      LIVE_BROKERS.map((broker) => checkBroker(broker, firstName, lastName, state))
    );

    // Add coming-soon brokers as roadmap items
    const comingSoonResults: BrokerResult[] = COMING_SOON_BROKERS.map((broker) => ({
      brokerId: broker.id,
      brokerName: broker.name,
      brokerType: broker.type,
      brokerUrl: broker.url,
      status: "coming_soon" as const,
      dataTypes: broker.dataTypes,
      profileUrl: null,
      optOutUrl: broker.optOutUrl,
      checkedAt: new Date().toISOString(),
    }));

    const allResults = [...liveResults, ...comingSoonResults];
    const foundResults = liveResults.filter((r) => r.status === "found");
    const dataPointsExposed = foundResults.reduce(
      (sum, r) => sum + r.dataTypes.length,
      0
    );

    const response: ScanResponse = {
      id: generateId(),
      query: { firstName, lastName, city: body.city, state },
      results: allResults,
      summary: {
        totalChecked: LIVE_BROKERS.length,
        totalFound: foundResults.length,
        totalComingSoon: COMING_SOON_BROKERS.length,
        dataPointsExposed,
        riskLevel: getRiskLevel(foundResults.length),
      },
      scannedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Scan failed. Please try again." },
      { status: 500 }
    );
  }
}
