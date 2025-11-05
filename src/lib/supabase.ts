const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://mock.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "mock-anon-key";

interface MockSupabaseClient {
  from: (table: string) => MockQueryBuilder;
  rpc: (
    fn: string,
    params?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: null }>;
  auth: {
    signInWithOtp: (params: {
      email: string;
    }) => Promise<{ data: unknown; error: null }>;
    getSession: () => Promise<{ data: { session: null }; error: null }>;
  };
}

interface MockQueryBuilder {
  select: (columns?: string) => MockQueryBuilder;
  insert: (data: unknown) => MockQueryBuilder;
  update: (data: unknown) => MockQueryBuilder;
  delete: () => MockQueryBuilder;
  eq: (column: string, value: unknown) => MockQueryBuilder;
  order: (
    column: string,
    options?: { ascending?: boolean },
  ) => MockQueryBuilder;
  limit: (count: number) => MockQueryBuilder;
  single: () => Promise<{ data: unknown; error: null }>;
  then: (
    resolve: (value: { data: unknown[]; error: null }) => void,
  ) => Promise<void>;
}

class MockQueryBuilderImpl implements MockQueryBuilder {
  private _table: string;
  private _data: unknown[] = [];

  constructor(table: string) {
    this._table = table;
  }

  select(_columns?: string): MockQueryBuilder {
    return this;
  }

  insert(_data: unknown): MockQueryBuilder {
    return this;
  }

  update(_data: unknown): MockQueryBuilder {
    return this;
  }

  delete(): MockQueryBuilder {
    return this;
  }

  eq(_column: string, _value: unknown): MockQueryBuilder {
    return this;
  }

  order(_column: string, _options?: { ascending?: boolean }): MockQueryBuilder {
    return this;
  }

  limit(_count: number): MockQueryBuilder {
    return this;
  }

  async single(): Promise<{ data: unknown; error: null }> {
    return { data: this._mockData()[0] || null, error: null };
  }

  async then(
    resolve: (value: { data: unknown[]; error: null }) => void,
  ): Promise<void> {
    resolve({ data: this._mockData(), error: null });
  }

  private _mockData(): unknown[] {
    switch (this._table) {
      case "affiliates":
        return [
          {
            id: "1",
            username: "alpha_wolf",
            tier: "gold",
            total_conversions: 247,
            total_revenue: 12450,
          },
          {
            id: "2",
            username: "street_king",
            tier: "silver",
            total_conversions: 156,
            total_revenue: 7800,
          },
          {
            id: "3",
            username: "night_rider",
            tier: "bronze",
            total_conversions: 89,
            total_revenue: 4450,
          },
          {
            id: "4",
            username: "urban_legend",
            tier: "iron",
            total_conversions: 34,
            total_revenue: 1700,
          },
        ];
      case "scans":
        return [];
      case "checkins":
        return [];
      default:
        return [];
    }
  }
}

export const supabase: MockSupabaseClient = {
  from: (table: string) => new MockQueryBuilderImpl(table),
  rpc: async (_fn: string, _params?: Record<string, unknown>) => {
    return { data: { success: true }, error: null };
  },
  auth: {
    signInWithOtp: async (_params: { email: string }) => {
      return { data: { sent: true }, error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
  },
};
