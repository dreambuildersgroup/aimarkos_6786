from crewai import Agent, Crew, Task
from langchain_openai import ChatOpenAI
import os

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

def create_marketing_crew(goal: str = "Launch a high-ROAS campaign for a digital agency"):
    researcher = Agent(
        role="Senior Market Researcher",
        goal="Find insights and competitor gaps",
        backstory="You are an expert at market research and SEO analysis",
        llm=llm,
        verbose=True
    )

    optimizer = Agent(
        role="Campaign Optimizer",
        goal="Maximize ROAS and efficiency",
        backstory="You are a data-driven PPC and SEO optimizer",
        llm=llm,
        verbose=True
    )

    executor = Agent(
        role="Campaign Executor",
        goal="Execute and monitor campaigns",
        backstory="You turn strategies into real actions",
        llm=llm,
        verbose=True
    )

    task1 = Task(description=f"Research the goal: {goal}", expected_output="Key insights", agent=researcher)
    task2 = Task(description="Optimize the strategy", expected_output="Optimized recommendations", agent=optimizer)
    task3 = Task(description="Execute the plan", expected_output="Actionable steps", agent=executor)

    crew = Crew(agents=[researcher, optimizer, executor], tasks=[task1, task2, task3], verbose=True)

    result = crew.kickoff()
    return str(result)