from bs4 import BeautifulSoup
import requests
import json


class StackOverflow:
    """
        Class - `StackOverflow`\n
        Example
        ```python
        que = StackOverflow(topic:str)
        ```
        \n
    | Methods                     | Details                                                                                              |
    | --------------------------- | ---------------------------------------------------------------------------------------------------- |
    | `.getNewQuestions()`        | Returns the new questions, views, votes, answer counts, and descriptions in JSON format              |
    | `.getActiveQuestions()`     | Returns the active questions, views, votes, answer counts, and descriptions in JSON format           |
    | `.getUnansweredQuestions()` | Returns the unanswered questions, views, votes, answer counts, and descriptions in JSON format       |
    | `.getBountiedQuestions()`   | Returns the bountied questions, views, votes, answer counts, and descriptions in JSON format         |
    | `.getFrequentQuestions()`   | Returns the frequently asked questions, views, votes, answer counts, and descriptions in JSON format |
    | `.getHighScoredQuestions()` | Returns the most voted questions, views, votes, answer counts, and descriptions in JSON format       |
    """

    def __init__(self, topic):
        self.topic = topic

    def getNewQuestions(self):
        """
        Returns the list of newest questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getNewQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = "https://stackoverflow.com/questions/tagged/" + self.topic + "?tab=Newest"
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            json_data = json.dumps(questions_data)
            return json_data
        except:
            error_message = {"message": "No questions related to the topic found"}

            ejson = json.dumps(error_message)
            return ejson

    def getActiveQuestions(self):
        """
        Returns the list of active questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getActiveQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = "https://stackoverflow.com/questions/tagged/" + self.topic + "?tab=Active"
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            questions_list = questions_data["questions"]
            return questions_list
        except:
            return None

    def getBountiedQuestions(self):
        """
        Returns the list of bountied questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getBountiedQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = (
            "https://stackoverflow.com/questions/tagged/" + self.topic + "?tab=Bounties"
        )
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            questions_list = questions_data["questions"]
            return questions_list
        except:
            return None

    def getUnansweredQuestions(self):
        """
        Returns the list of unanswered questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getUnansweredQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = (
            "https://stackoverflow.com/questions/tagged/"
            + self.topic
            + "?tab=Unanswered"
        )
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            questions_list = questions_data["questions"]
            return questions_list
        except:
            return None

    def getFrequentQuestions(self):
        """
        Returns the list of frequent questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getFrequentQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = (
            "https://stackoverflow.com/questions/tagged/" + self.topic + "?tab=Frequent"
        )
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            questions_list = questions_data["questions"]
            return questions_list
        except:
            return None

    def getHighScoredQuestions(self):
        """
        Returns the list of high scored questions, views, votes, answer counts, and descriptions.\n
        Class - `StackOverflow`
        Example:
        ```
        que = StackOverflow(topic="github")
        scrape = que.getHighScoredQuestions()
        ```
        Returns:
        {
            "question": question title
            "views": view count of question
            "vote_count": vote count of question
            "answer_count": no. of answers to the question
            "description": description of the question
        }
        """
        url = "https://stackoverflow.com/questions/tagged/" + self.topic + "?tab=Votes"
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            questions_data = {"questions": []}

            questions = soup.select(".s-post-summary")
            for que in questions:
                title = que.select_one(".s-link").getText()
                stats = que.select(".s-post-summary--stats-item-number")
                vote = stats[0].getText()
                ans = stats[1].getText()
                views = stats[2].getText()
                desc = (
                    que.select_one(".s-post-summary--content-excerpt")
                    .getText()
                    .strip()
                    .encode("ascii", "ignore")
                    .decode()
                    .replace("  ", "")
                )
                questions_data["questions"].append(
                    {
                        "question": title,
                        "views": views,
                        "vote_count": vote,
                        "answer_count": ans,
                        "description": desc,
                    }
                )
            questions_list = questions_data["questions"]
            return questions_list
        except:
            return None


stack = StackOverflow(topic="python")
print(stack.getBountiedQuestions())
