# Strands Agent Setup Guide

## Quick Setup (Choose One Option)

### Option 1: Bedrock API Key (Recommended for Getting Started)

1. **Get your API key:**
   - Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
   - Navigate to "API keys" in the left sidebar
   - Click "Generate API key"
   - Choose 30-day expiration (for development)
   - Copy the key (shown only once!)

2. **Enable model access:**
   - In Bedrock Console → "Model access" → "Manage model access"
   - Enable "Claude 4 Sonnet" or your preferred model
   - Wait a few minutes for access to activate

3. **Set environment variable:**
   ```bash
   export AWS_BEDROCK_API_KEY=your_bedrock_api_key_here
   ```

### Option 2: AWS Credentials (For Production)

1. **Configure AWS CLI:**
   ```bash
   aws configure
   ```
   
2. **Or set environment variables:**
   ```bash
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   export AWS_REGION=us-west-2
   ```

## Test Your Setup

Run the simple example:
```bash
python simple_agent.py
```

If it works, try the advanced example:
```bash
python custom_tool_agent.py
```

## What You Can Do Next

1. **Modify the examples** - Change the system prompts or add new tools
2. **Create your own tools** - Use the `@tool` decorator on any function
3. **Try different models** - Use different Bedrock models or other providers
4. **Build complex agents** - Combine multiple tools for sophisticated workflows

## Troubleshooting

- **"Access denied"** → Enable model access in Bedrock console
- **"Invalid API key"** → Check your environment variable is set correctly
- **"Module not found"** → Make sure you installed both packages: `pip install strands-agents strands-agents-tools`

## Next Steps

Once you have the basic examples working, you can:
- Explore the community tools in `strands_tools`
- Create domain-specific agents for your use cases
- Integrate agents into larger applications
- Try different LLM providers (Anthropic, OpenAI, Gemini, Llama)