// API utilities for extension

export interface ApiResponse {
  success: boolean;
  improvedText?: string;
  error?: string;
}

// Storage utilities
export const getApiKey = async (): Promise<string | null> => {
  try {
    const result = await chrome.storage.sync.get(['apiKey']);
    return result.apiKey || null;
  } catch (error) {
    console.error('Error getting API key:', error);
    return null;
  }
};

export const saveApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    await chrome.storage.sync.set({ apiKey });
    return true;
  } catch (error) {
    console.error('Error saving API key:', error);
    return false;
  }
};

// API call to improve text using OpenAI
export const improveText = async (text: string): Promise<ApiResponse> => {
  try {
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      return {
        success: false,
        error: 'API key not found. Please set your OpenAI API key in the extension popup.'
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that improves text. Make the text more clear, professional, and well-written while preserving the original meaning and intent. Return only the improved text without any explanations or additional formatting.'
          },
          {
            role: 'user',
            content: `Please improve this text: ${text}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const improvedText = data.choices[0].message.content.trim();
    
    return {
      success: true,
      improvedText: improvedText
    };
  } catch (error) {
    console.error('Error improving text:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 