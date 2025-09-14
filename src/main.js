import './style.css'
import { generateImage, getLastEnhancedPrompt } from './imageGenerator.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <h1 class="title">✨ AI Image Generator</h1>
      <p class="subtitle">Create stunning images with Google AI</p>
    </header>
    
    <main class="main">
      <div class="input-section">
        <div class="form-group">
          <label for="prompt" class="label">Image Description</label>
          <textarea 
            id="prompt" 
            class="prompt-input" 
            placeholder="Describe the image you want to create... e.g., 'A serene mountain landscape at sunset with a lake reflecting the colors'"
            rows="4"
          ></textarea>
          <small class="help-text">💡 Press Ctrl+Enter to generate</small>
        </div>
        
        <div class="form-group">
          <label for="style" class="label">Style</label>
          <select id="style" class="style-select">
            <option value="">Default</option>
            <option value="photorealistic">Photorealistic</option>
            <option value="digital art">Digital Art</option>
            <option value="oil painting">Oil Painting</option>
            <option value="watercolor">Watercolor</option>
            <option value="cartoon">Cartoon</option>
            <option value="minimalist">Minimalist</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>
        
        <button id="generate-btn" class="generate-btn">
          <span class="btn-text">Generate Image</span>
          <span class="loading-spinner">🔄</span>
        </button>
        
        <div id="enhanced-prompt-section" class="enhanced-prompt-section" style="display: none;">
          <label class="label">Enhanced Prompt by AI</label>
          <div id="enhanced-prompt" class="enhanced-prompt"></div>
          <button id="copy-prompt-btn" class="copy-prompt-btn">📋 Copy Enhanced Prompt</button>
          <p class="prompt-help">Use this enhanced prompt with DALL-E, Midjourney, or Stable Diffusion for best results!</p>
        </div>
      </div>
      
      <div class="result-section">
        <div id="image-container" class="image-container">
          <div class="placeholder">
            <div class="placeholder-icon">🎨</div>
            <p>Your generated image will appear here</p>
            <small>Since Google AI Studio doesn't generate images directly, we'll create an enhanced prompt for you to use with other AI image generators.</small>
          </div>
        </div>
        
        <div id="error-message" class="error-message"></div>
      </div>
    </main>
    
    <footer class="footer">
      <p>Powered by Google AI Studio • Enhanced prompts for better image generation</p>
    </footer>
  </div>
`

// Initialize the app
const generateBtn = document.querySelector('#generate-btn');
const promptInput = document.querySelector('#prompt');
const styleSelect = document.querySelector('#style');
const imageContainer = document.querySelector('#image-container');
const errorMessage = document.querySelector('#error-message');
const enhancedPromptSection = document.querySelector('#enhanced-prompt-section');
const enhancedPromptDiv = document.querySelector('#enhanced-prompt');
const copyPromptBtn = document.querySelector('#copy-prompt-btn');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  
  if (!prompt) {
    showError('Please enter a description for your image');
    return;
  }
  
  setLoading(true);
  clearError();
  hideEnhancedPrompt();
  
  try {
    const style = styleSelect.value;
    const fullPrompt = style ? `${prompt}, ${style} style` : prompt;
    
    const imageUrl = await generateImage(fullPrompt);
    displayImage(imageUrl);
    showEnhancedPrompt();
  } catch (error) {
    console.error('Error generating image:', error);
    showError(error.message || 'Failed to generate image. Please try again.');
  } finally {
    setLoading(false);
  }
});

// Enable generate on Enter key
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    generateBtn.click();
  }
});

// Copy enhanced prompt
copyPromptBtn.addEventListener('click', async () => {
  const enhancedPrompt = getLastEnhancedPrompt();
  if (enhancedPrompt) {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      copyPromptBtn.textContent = '✅ Copied!';
      setTimeout(() => {
        copyPromptBtn.textContent = '📋 Copy Enhanced Prompt';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
      alert('Failed to copy to clipboard');
    }
  }
});

function setLoading(loading) {
  generateBtn.disabled = loading;
  generateBtn.classList.toggle('loading', loading);
}

function displayImage(imageUrl) {
  imageContainer.innerHTML = `
    <img src="${imageUrl}" alt="Generated image placeholder" class="generated-image" />
    <div class="image-actions">
      <button onclick="downloadImage('${imageUrl}')" class="download-btn">
        💾 Download Placeholder
      </button>
      <button onclick="openImageGenerators()" class="copy-btn">
        � Open Image Generators
      </button>
    </div>
  `;
}

function showEnhancedPrompt() {
  const enhancedPrompt = getLastEnhancedPrompt();
  if (enhancedPrompt) {
    enhancedPromptDiv.textContent = enhancedPrompt;
    enhancedPromptSection.style.display = 'block';
  }
}

function hideEnhancedPrompt() {
  enhancedPromptSection.style.display = 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function clearError() {
  errorMessage.style.display = 'none';
}

// Global functions for image actions
window.downloadImage = (url) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-generated-placeholder-${Date.now()}.png`;
  a.click();
};

window.openImageGenerators = () => {
  const generators = [
    'https://openai.com/dall-e-2/',
    'https://www.midjourney.com/',
    'https://stablediffusionweb.com/',
    'https://www.canva.com/ai-image-generator/'
  ];
  
  generators.forEach(url => window.open(url, '_blank'));
};
