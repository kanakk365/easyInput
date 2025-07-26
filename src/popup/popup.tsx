import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { getApiKey, saveApiKey } from '../utils/api';

const PopupContainer = styled.div`
  width: 300px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: white;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: #2563eb;
    }
    
    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #f9fafb;
    }
  `}
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;
  
  ${props => props.type === 'success' ? `
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  ` : `
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  `}
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
  line-height: 1.4;
`;

const Popup: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const savedKey = await getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter an API key' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const success = await saveApiKey(apiKey.trim());
      
      if (success) {
        setStatusMessage({ type: 'success', text: 'API key saved successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to save API key' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error saving API key' });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    setStatusMessage(null);

    try {
      await saveApiKey('');
      setApiKey('');
      setStatusMessage({ type: 'success', text: 'API key cleared' });
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error clearing API key' });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <PopupContainer>
        <Title>Loading...</Title>
      </PopupContainer>
    );
  }

  return (
    <PopupContainer>
      <Title>EasyInput Settings</Title>
      <Description>
        Enter your OpenAI API key to enable AI-powered text improvement. 
        Right-click on any text field and select "Polish with LLM" to get started.
      </Description>
      
      <InputLabel htmlFor="api-key">OpenAI API Key</InputLabel>
      <Input
        id="api-key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your OpenAI API key..."
        disabled={loading}
      />
      
      <HelpText>
        Your OpenAI API key will be stored securely in your browser and used to communicate with OpenAI's API for text improvement.
      </HelpText>

      <Button 
        variant="primary" 
        onClick={handleSave}
        disabled={loading || !apiKey.trim()}
      >
        {loading ? 'Saving...' : 'Save OpenAI API Key'}
      </Button>

      {apiKey && (
        <Button 
          variant="secondary" 
          onClick={handleClear}
          disabled={loading}
        >
          Clear OpenAI API Key
        </Button>
      )}

      {statusMessage && (
        <StatusMessage type={statusMessage.type}>
          {statusMessage.text}
        </StatusMessage>
      )}
    </PopupContainer>
  );
};

// Render the popup
const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
} 