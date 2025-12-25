#!/usr/bin/env python3
"""
Advanced Strands Agent Example with Custom Tools

This example shows how to create custom tools and use them with an agent.
"""

from strands import Agent, tool
from strands_tools import calculator
import datetime
import random

@tool
def get_current_time() -> str:
    """Get the current date and time.
    
    Returns:
        Current date and time as a formatted string
    """
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@tool
def roll_dice(sides: int = 6, count: int = 1) -> str:
    """Roll one or more dice.
    
    Args:
        sides: Number of sides on each die (default: 6)
        count: Number of dice to roll (default: 1)
        
    Returns:
        Results of the dice rolls
    """
    if sides < 2 or count < 1:
        return "Invalid input: sides must be >= 2, count must be >= 1"
    
    rolls = [random.randint(1, sides) for _ in range(count)]
    total = sum(rolls)
    
    if count == 1:
        return f"Rolled a {sides}-sided die: {rolls[0]}"
    else:
        return f"Rolled {count} {sides}-sided dice: {rolls} (total: {total})"

@tool
def generate_password(length: int = 12) -> str:
    """Generate a random password.
    
    Args:
        length: Length of the password (default: 12)
        
    Returns:
        A randomly generated password
    """
    import string
    
    if length < 4:
        return "Password length must be at least 4 characters"
    
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choice(chars) for _ in range(length))
    return f"Generated password: {password}"

def main():
    print("🤖 Creating Advanced Strands Agent with Custom Tools...")
    
    # Create an agent with both community and custom tools
    agent = Agent(
        tools=[
            calculator,           # Community tool
            get_current_time,     # Custom tool
            roll_dice,           # Custom tool
            generate_password    # Custom tool
        ],
        system_prompt="""You are a helpful assistant with access to various tools. 
        You can calculate, get the current time, roll dice, and generate passwords. 
        Always be helpful and explain what you're doing."""
    )
    
    print("✅ Agent created with custom tools!")
    print("\n" + "="*60)
    print("🧪 Testing custom tools...")
    print("="*60)
    
    test_questions = [
        "What time is it right now?",
        "Roll 3 six-sided dice for me",
        "Generate a 16-character password",
        "What's 25% of 240?",
        "Roll a 20-sided die and tell me if it's higher than 15"
    ]
    
    try:
        for i, question in enumerate(test_questions, 1):
            print(f"\n🧪 Test {i}: {question}")
            response = agent(question)
            print(f"🤖 Agent: {response}")
            print("-" * 40)
        
        print("\n✅ All tests completed! Your custom tools are working.")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Make sure you have AWS credentials configured.")

if __name__ == "__main__":
    main()