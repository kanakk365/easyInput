// Message types for communication between scripts
export interface BackgroundMessage {
  action: 'polishText' | 'getActiveTab';
  data?: {
    selectionText?: string;
  };
}

export interface ContentMessage {
  action: 'polishText';
  data: {
    selectionText: string;
  };
}

// API response types
export interface ApiResponse {
  success: boolean;
  improvedText?: string;
  error?: string;
}

// Storage types
export interface StorageData {
  apiKey?: string;
}

// Extension context types
export interface ExtensionContext {
  tabId?: number;
  url?: string;
} 