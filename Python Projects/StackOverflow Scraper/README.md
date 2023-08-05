## Stack Overflow

### Scrape questions, views, votes, answer counts, and descriptions from Stack Overflow website regarding a topic

Create an instance of `StackOverflow` class.

```python
questions = StackOverflow("topic")
```

| Methods        | Details                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| `.getNewQuestions()`        | Returns the new questions, views, votes, answer counts, and descriptions in JSON format              |
| `.getActiveQuestions()`     | Returns the active questions, views, votes, answer counts, and descriptions in JSON format           |
| `.getUnansweredQuestions()` | Returns the unanswered questions, views, votes, answer counts, and descriptions in JSON format       |
| `.getBountiedQuestions()`   | Returns the bountied questions, views, votes, answer counts, and descriptions in JSON format         |
| `.getFrequentQuestions()`   | Returns the frequently asked questions, views, votes, answer counts, and descriptions in JSON format |
| `.getHighScoredQuestions()` | Returns the most voted questions, views, votes, answer counts, and descriptions in JSON format       |

**Example**

```python
que = StackOverflow("github")
scrape = que.getNewQuestions()
json = json.loads(scrape)
questions = json["questions"]
for q in questions:
    print("\nQuestion: ", q["question"])
    print("Views: ", q["views"])
    print("Votes: ", q["vote_count"])
    print("Answers: ", q["answer_count"])
    print("Description: ", q["description"])

```