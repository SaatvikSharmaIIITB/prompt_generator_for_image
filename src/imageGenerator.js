// Google AI Studio API integration for image generation

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function generateImage(prompt) {
  if (!API_KEY) {
    throw new Error('Google AI API key not found. Please add VITE_GOOGLE_AI_API_KEY to your .env file');
  }

  try {
    // Note: Google AI Studio (Gemini) doesn't directly generate images like DALL-E
    // Instead, we'll use it to generate a detailed image description and then 
    // provide instructions for the user to use with an image generation service
    
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Create a detailed, artistic description for an image based on this prompt: "${prompt}". Include specific details about composition, lighting, colors, style, and atmosphere. Make it suitable for an AI image generator. Keep it under 200 words but be very descriptive.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhancedPrompt) {
      throw new Error('No response received from Google AI');
    }

    // Since Google AI Studio doesn't generate images directly, we'll simulate the process
    // and provide a placeholder with the enhanced prompt
    return createImagePlaceholder(enhancedPrompt, prompt);

  } catch (error) {
    console.error('Error calling Google AI API:', error);
    throw new Error(error.message || 'Failed to generate image description');
  }
}

function createImagePlaceholder(enhancedPrompt, originalPrompt) {
  // Create a data URL with the enhanced prompt as a visual placeholder
  // In a real implementation, you'd send this enhanced prompt to an image generation service
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 512;
  canvas.height = 512;
  
  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎨 AI Generated', canvas.width / 2, 60);
  
  // Add original prompt
  ctx.font = '16px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  
  const words = originalPrompt.split(' ');
  const lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > canvas.width - 40) {
      lines.push(currentLine);
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine);
  
  lines.slice(0, 15).forEach((line, index) => {
    ctx.fillText(line.trim(), canvas.width / 2, 120 + (index * 22));
  });
  
  // Add enhanced prompt info
  ctx.font = '12px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('Enhanced by Google AI Studio', canvas.width / 2, canvas.height - 40);
  ctx.fillText('Use this description with DALL-E, Midjourney, or Stable Diffusion', canvas.width / 2, canvas.height - 20);
  
  // Store the enhanced prompt in localStorage for easy access
  localStorage.setItem('lastEnhancedPrompt', enhancedPrompt);
  
  return canvas.toDataURL();
}

// Function to get the last enhanced prompt
export function getLastEnhancedPrompt() {
  return localStorage.getItem('lastEnhancedPrompt');
}
