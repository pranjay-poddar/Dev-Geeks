(async function getData() {
  const apiUrl = "https://api.github.com/graphql";
  const accessToken = "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";
  const owner = "pranjay-poddar";
  const name = "Dev-Geeks";

  const query = `
      query ($owner: String!, $name: String!) {

        repository(owner: $owner, name: $name) {

          issues(states: CLOSED) {
            totalCount
          }
          pullRequests(states: CLOSED) {
            totalCount
          }
          mentionableUsers {
            totalCount
          }
        }
      }
    `;

  const variables = {
    owner: owner,
    name: name,
  };

  const closedIssuesDisplayer = document.getElementById("value1");
  const totalContributorsDisplayer = document.getElementById("value2");
  const closedPRsDisplayer = document.getElementById("value3");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });

  if (response.ok) {

    const data = await response.json();

    const closedIssuesCount = data.data.repository.issues.totalCount;
    const closedPullRequestsCount = data.data.repository.pullRequests.totalCount;
    const contributorsCount = data.data.repository.mentionableUsers.totalCount;

    closedIssuesDisplayer.textContent = closedIssuesCount;
    closedPRsDisplayer.textContent = closedPullRequestsCount;
    totalContributorsDisplayer.textContent = contributorsCount;

    closedIssuesDisplayer.style = 'font-size: 3.5rem'
    closedPRsDisplayer.style = 'font-size: 3.5rem'
    totalContributorsDisplayer.style = 'font-size: 3.5rem'
    
  } else {

    closedIssuesDisplayer.textContent = 'Retry';
    closedPRsDisplayer.textContent = 'Retry';
    totalContributorsDisplayer.textContent = 'Retry';
  }
})();