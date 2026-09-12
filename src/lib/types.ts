export interface ScanRequest {
  firstName: string;
  lastName: string;
  city?: string;
  state?: string;
}

export interface BrokerResult {
  brokerId: string;
  brokerName: string;
  brokerType: string;
  brokerUrl: string;
  status: "found" | "not_found" | "error" | "coming_soon";
  dataTypes: string[];
  profileUrl: string | null;
  optOutUrl: string | null;
  checkedAt: string;
}

export interface ScanResponse {
  id: string;
  query: ScanRequest;
  results: BrokerResult[];
  summary: {
    totalChecked: number;
    totalFound: number;
    totalComingSoon: number;
    dataPointsExposed: number;
    riskLevel: string;
  };
  scannedAt: string;
}
