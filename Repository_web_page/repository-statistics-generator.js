const getData = async () => {

  const closedIssuesDisplayer = document.getElementById("value1");
  const totalContributorsDisplayer = document.getElementById("value2");
  const closedPRsDisplayer = document.getElementById("value3");
  const fetchValueArray = document.querySelectorAll('.fetchValue')

  const apiUrl = "https://api.github.com/graphql";
  const accessToken = "";//Enter your Access Token
  const owner = "pranjay-poddar";
  const name = "Dev-Geeks";

  const queryTemplate = `query ($owner: String!, $name: String!) {
                    repository(owner: $owner, name: $name) {
                      issues(states: CLOSED) {totalCount}
                      pullRequests(states: CLOSED) {totalCount}
                      mentionableUsers {totalCount}
                    }
                  }`;
  const info = {owner,name};

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query: queryTemplate ,variables:info}),
  });

  if (response.ok) {
    const data = await response.json();

    const closedIssuesCount = data.data.repository.issues.totalCount;
    const closedPullRequestsCount = data.data.repository.pullRequests.totalCount;
    const contributorsCount = data.data.repository.mentionableUsers.totalCount;

    closedIssuesDisplayer.textContent = closedIssuesCount;
    closedPRsDisplayer.textContent = closedPullRequestsCount;
    totalContributorsDisplayer.textContent = contributorsCount;

    fetchValueArray.forEach((ele)=>ele.style = 'font-size: 3.5rem');

  } 
  else{
    fetchValueArray.forEach((ele)=>ele.textContent = 'Retry');
  }

}

getData();