export type Capabilities = Record<string, unknown>;

export const enum DataType {
  FetchDescriptor,
  Result,
}

export interface Subtest {
  name: string;
  status: number;
  PASS: number;
  PRECONDITION_FAILED: number;
}

export interface TestResult {
  0: string;
  1: {
    tests: Array<Subtest>;
  };
}

export interface ResultData {
  type: DataType.Result;
  result: [number, number];
  details: Array<TestResult>;
}

export interface FetchDescriptorData {
  type: DataType.FetchDescriptor;
  capabilities: Capabilities;
}

export interface BrowserVersion {
  name: string;
  data: FetchDescriptorData | ResultData;
}

export interface BrowserDefinition {
  name: string;
  logo: string;
  versions: BrowserVersion[];
}