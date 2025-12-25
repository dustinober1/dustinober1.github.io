#!/usr/bin/env python3
"""
Simple Strands Agent Example

This example creates an AI agent that can use tools like calculator, 
Python REPL, and HTTP requests to answer questions.

Before running, you need AWS Bedrock credentials. Choose one option:

Option 1 - Bedrock API Key (Quick Start):
1. Go to https://console.aws.amazon.com/bedrock → API keys
2. Generate a 30-day API key
3. Set: export AWS_BEDROCK_API_KEY=your_key_here

Option 2 - AWS Credentials (Production):
1. Run: aws configure
2. Or set: export AWS_ACCESS_KEY_ID=... and AWS_SECRET_ACCESS_KEY=...

Don't forget to enable model access in Bedrock console!
"""

from strands import Agent
from strands_tools import calculator, python_repl, http_request

def main():
    print("🤖 Creating Strands Agent...")
    
    # Create an agent with community tools (uses Bedrock Claude 4 Sonnet by default)
    agent = Agent(
        tools=[calculator, python_repl, http_request],
        system_prompt="You are a helpful assistant with access to tools. You can calculate, run Python code, and make HTTP requests to help answer questions."
    )
    
    print("✅ Agent created successfully!")
    print("\n" + "="*50)
    print("🧪 Testing the agent...")
    print("="*50)
    
    # Test the agent with a simple question
    try:
        response = agent("What is 15 * 23 + 47?")
        print(f"\n🤖 Agent: {response}")
        
        print("\n" + "="*50)
        print("🧪 Testing conversation memory...")
        print("="*50)
        
        # Test conversation memory
        agent("My favorite number is 42")
        response2 = agent("What's my favorite number?")
        print(f"\n🤖 Agent: {response2}")
        
        print("\n✅ All tests passed! Your agent is working correctly.")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Make sure you have AWS credentials configured:")
        print("   - Bedrock API key: export AWS_BEDROCK_API_KEY=your_key")
        print("   - Or AWS credentials: aws configure")
        print("   - Enable model access in Bedrock console")

if __name__ == "__main__":
    main()