import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { improveText } from '../utils/api';

// Styled components for the overlay
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const OverlayModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  margin-top: 16px;
  
  &:first-of-type {
    margin-top: 0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
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

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background: #fef2f2;
  border-radius: 4px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f4f6;
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.4;
`;

interface TextImprovementOverlayProps {
  initialText: string;
  onClose: () => void;
  onReplace: (newText: string) => void;
}

const TextImprovementOverlay: React.FC<TextImprovementOverlayProps> = ({
  initialText,
  onClose,
  onReplace
}) => {
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await improveText(text);
      
      if (result.success && result.improvedText) {
        setText(result.improvedText);
      } else {
        setError(result.error || 'Failed to improve text');
      }
    } catch (err) {
      setError('Failed to improve text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReplace = () => {
    onReplace(text);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <OverlayContainer onClick={handleOverlayClick}>
      <OverlayModal>
        <Title>Improve Text with AI</Title>
        
        <InputLabel htmlFor="text-input">Text to Improve</InputLabel>
        <TextArea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to improve..."
        />
        <HelpText>
          Write your context directly on the website where you're using this extension. 
          For example: "I am making an extension so make it a tweet for X"
        </HelpText>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleImprove}
            disabled={loading || !text.trim()}
          >
            {loading && <LoadingSpinner />}
            Improve Text
          </Button>
          <Button 
            variant="primary" 
            onClick={handleReplace}
            disabled={!text.trim()}
          >
            Replace Original
          </Button>
        </ButtonContainer>
      </OverlayModal>
    </OverlayContainer>
  );
};



// Content script main functionality
class ContentScript {
  private overlayRoot: HTMLDivElement | null = null;
  private reactRoot: any = null;
  private lastFocusedElement: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      if (message.action === 'polishText') {
        this.handlePolishText();
      }
    });

    // Track focused elements
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      if (this.isEditableElement(target)) {
        this.lastFocusedElement = target;
        console.log('Tracked focused element:', target);
      }
    });

    // Also track on click for better element detection
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (this.isEditableElement(target)) {
        this.lastFocusedElement = target;
        console.log('Tracked clicked element:', target);
      }
    });
  }

  private isEditableElement(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    
    if (tagName === 'input') {
      const type = (element as HTMLInputElement).type.toLowerCase();
      return ['text', 'email', 'search', 'url', 'tel', 'password'].includes(type);
    }
    
    if (tagName === 'textarea') {
      return true;
    }
    
    return element.contentEditable === 'true';
  }

  private getElementValue(element: HTMLElement): string {
    if (element.tagName.toLowerCase() === 'input') {
      return (element as HTMLInputElement).value;
    }
    
    if (element.tagName.toLowerCase() === 'textarea') {
      return (element as HTMLTextAreaElement).value;
    }
    
    if (element.contentEditable === 'true') {
      return element.innerText || element.textContent || '';
    }
    
    return '';
  }

  private setElementValue(element: HTMLElement, value: string) {
    console.log('Setting value in element:', element, 'Value:', value);
    
    if (element.tagName.toLowerCase() === 'input') {
      (element as HTMLInputElement).value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('Set value in input element');
      return;
    }
    
    if (element.tagName.toLowerCase() === 'textarea') {
      (element as HTMLTextAreaElement).value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('Set value in textarea element');
      return;
    }
    
    if (element.contentEditable === 'true') {
      element.innerText = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('Set value in contentEditable element');
      return;
    }
    
    console.warn('Could not set value - element type not supported:', element);
  }

  private handlePolishText() {
    if (!this.lastFocusedElement) {
      console.warn('No focused editable element found');
      // Try to find the currently active element
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && this.isEditableElement(activeElement)) {
        this.lastFocusedElement = activeElement;
        console.log('Using active element as fallback:', activeElement);
      } else {
        console.error('No editable element found for text improvement');
        return;
      }
    }

    const currentText = this.getElementValue(this.lastFocusedElement);
    console.log('Current text from element:', currentText);
    this.showOverlay(currentText);
  }

  private showOverlay(initialText: string) {
    // Create overlay container
    this.overlayRoot = document.createElement('div');
    this.overlayRoot.id = 'easy-input-overlay';
    document.body.appendChild(this.overlayRoot);

    // Create React root and render overlay
    this.reactRoot = createRoot(this.overlayRoot);
    this.reactRoot.render(
      <TextImprovementOverlay
        initialText={initialText}
        onClose={this.hideOverlay.bind(this)}
        onReplace={this.replaceText.bind(this)}
      />
    );
  }

  private hideOverlay() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    
    if (this.overlayRoot) {
      document.body.removeChild(this.overlayRoot);
      this.overlayRoot = null;
    }
  }

  private replaceText(newText: string) {
    if (this.lastFocusedElement) {
      console.log('Replacing text in element:', this.lastFocusedElement);
      this.setElementValue(this.lastFocusedElement, newText);
      this.lastFocusedElement.focus();
    } else {
      console.warn('No last focused element found for text replacement');
    }
  }
}

// Initialize content script
new ContentScript(); 