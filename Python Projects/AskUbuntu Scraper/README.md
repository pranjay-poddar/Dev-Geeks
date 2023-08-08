## Ask Ubuntu

### Scrape questions, views, votes, answer counts, and descriptions from Ask Ubuntu website regarding a topic

Create an instance of `AskUbuntu` class.

```python
questions = AskUbuntu("topic")
```

| Methods                     | Details                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `.getNewQuestions()`        | Returns the new questions, views, votes, answer counts, and descriptions in JSON format              |
| `.getActiveQuestions()`     | Returns the active questions, views, votes, answer counts, and descriptions in JSON format           |

---