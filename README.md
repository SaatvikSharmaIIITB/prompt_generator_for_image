# ✨ AI Image Generator

A beautiful single-page web application that uses Google AI Studio to create enhanced prompts for image generation. This app leverages Google's Gemini AI to transform your simple image descriptions into detailed, professional prompts perfect for use with AI image generators like DALL-E, Midjourney, and Stable Diffusion.

## 🌟 Features

- **Smart Prompt Enhancement**: Transform basic descriptions into detailed, artistic prompts using Google AI Studio
- **Style Selection**: Choose from various artistic styles (photorealistic, digital art, watercolor, etc.)
- **Modern UI**: Beautiful, responsive design with dark/light mode support
- **Real-time Processing**: Live feedback with loading states and error handling
- **Copy & Share**: Easy copying of enhanced prompts for use in other AI tools
- **Secure**: Environment variable configuration for API key protection

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- A Google AI Studio API key

### Installation

1. **Get your Google AI Studio API key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an account or sign in
   - Generate a new API key

2. **Configure your API key**:
   - Copy the `.env` file and add your API key:
   ```bash
   VITE_GOOGLE_AI_API_KEY=your_actual_api_key_here
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 How to Use

1. **Enter a Description**: Write a simple description of the image you want to create
2. **Choose a Style**: Select from various artistic styles or leave as default
3. **Generate**: Click "Generate Image" or press Ctrl+Enter
4. **Get Enhanced Prompt**: The AI will create a detailed, professional prompt
5. **Use with Image Generators**: Copy the enhanced prompt and use it with:
   - [DALL-E](https://openai.com/dall-e-2/)
   - [Midjourney](https://www.midjourney.com/)
   - [Stable Diffusion](https://stablediffusionweb.com/)
   - [Canva AI](https://www.canva.com/ai-image-generator/)

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── main.js             # Main application logic
│   ├── style.css           # Styling and animations
│   └── imageGenerator.js   # Google AI Studio integration
├── .env                    # Environment variables (add your API key here)
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_AI_API_KEY` | Your Google AI Studio API key | Yes |

### API Integration

This app uses Google AI Studio's Gemini model to enhance prompts. The integration:

- Sends your description to Google AI
- Receives a detailed, artistic prompt
- Creates a visual placeholder with the enhanced prompt
- Stores the prompt for easy copying

## 🎨 Customization

### Adding New Styles

To add new artistic styles, edit the `style-select` options in `src/main.js`:

```javascript
<option value="your-new-style">Your New Style</option>
```

### Modifying the AI Prompt

To change how the AI enhances prompts, edit the prompt in `src/imageGenerator.js`:

```javascript
text: `Your custom instruction for the AI...`
```

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Supports both light and dark themes

## 🔒 Security

- API keys are stored in environment variables
- `.env` file is excluded from version control
- No sensitive data is logged or stored permanently

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you encounter any issues:

1. Check that your API key is correctly set in the `.env` file
2. Ensure you have a stable internet connection
3. Verify your Google AI Studio API key has sufficient quota
4. Check the browser console for error messages

## 🌟 Tips for Best Results

- Be descriptive but concise in your initial prompt
- Experiment with different styles
- Use the enhanced prompts as starting points and modify as needed
- Combine multiple enhanced prompts for complex scenes

---

**Note**: This app creates enhanced prompts using Google AI Studio but doesn't generate actual images. The enhanced prompts are designed to work excellently with dedicated image generation services.
