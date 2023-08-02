# Follow these steps to contribute

## How to add your projects to ProjectsHut

#### 1. Fork this repository

![ Fork this repository](https://user-images.githubusercontent.com/88102392/226444075-7d7d28b5-8d88-459a-bb82-38a3f64aaf28.png)

#### 2. Click on `Go to file`

![Go to file](https://user-images.githubusercontent.com/88102392/226444608-12a2abb9-436c-4843-8893-49029cb4c033.png)

#### 3. Add following code to end of `src/DB/projects.json`

```json
{
  "github_username": "YOUR_GITHUB_USERNAME",
  "Social_media": {
    "gitHub": "YOUR_GITHUB_ACCOUNT_LINK",
    "LinkedIn": "YOUR_LINKEDIN_ACCOUNT_LINK",
    "Instagram": "YOUR_INSTAGRAM_ACCOUNT_LINK",
    "YouTube": "YOUR_YOUTUBE_ACCOUNT_LINK",
    "Twitter": "YOUR_TWITTER_ACCOUNT_LINK"
  },
  "Projects": [
    {
      "link": "PROJECT_LINK",
      "title": "PROJECT_NAME",
      "description": "PROJECT_DESCRIPTION",
      "tech": ["tech1", "tech2"]
    },
    {
      "link": "PROJECT_LINK",
      "title": "PROJECT_NAME",
      "description": "PROJECT_DESCRIPTION",
      "tech": ["tech1", "tech2"]
    }
  ]
}
```

> **Important**: You should write the full Tech name

- > **👎 Bad Tech Names:** js, JS, react, reactjs, css <br>
- > **👍 Good Tech Names:** Javascript, ReactJS, CSS

#### 4. Commit all changes.

- Add a commit like this for only projects addition `chore: project addition by [your-githubuser-name] #issue_number`

> ## **Note** Alternatively, if you prefer to run the project locally, follow these steps:

1.  Go to preferred folder in your computer and paste the following command after forking our repository (Only one of it if you don't have ssh setup then go with HTTP command)

```
git clone https://github.com/<YOUR-USERNAME>/ProjectsHut.git
```

2.  Navigate to the project folder

```
cd ProjectsHut
```

3.  Install dependencies

```bash
pnpm i
```

> **Note**: If you don't have pnpm installed in your system then run this command `npm i -g pnpm`

4.  Now do ahead and create a new branch and move to the branch

```bash
git checkout -b fix-issue-<ISSUE-NUMBER>
```

> **Note**: Replace `<ISSUE-NUMBER>` with the issue number you are working on

5.  Run in local

```bash
pnpm dev
```

> Add new features or fix bugs according to your issue number

6.  After done you can now push this changes, for doing that follow the following command chain

- `git status -s` (Shows the changed files)
- `git add --all` (Will add all the files to staging area)
- `git commit -m "feat/docs/fix: <EXPLAIN-YOUR_CHANGES>"`

  > **Note**: Replace `<EXPLAIN-YOUR_CHANGES>` with the changes you have made. Also, follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for writing commit messages
  > If you encounter this error while commits
  >
  > ```diff
  > husky - pre-commit hook exited with code 1(error)
  > ```
  >
  > use this command
  >
  > ```diff
  > pnpm format
  > ```

- `git remote add upstream https://github.com/priyankarpal/ProjectsHut.git`
- `git push origin fix-issue-<ISSUE-NUMBER>`

7.  After this go to your forked GitHub repository and go to `Pull Request` section. Now you might be able to see a pop up saying **Pull Request**. Click on the popup and you will be redirected to pull request page

8.  Now fill in the form template of the pull request and give the necessary description.

9.  Click on **Submit**

10. Hurray! You just made your first contribution to this project 🎉

11. Wait for your pull request to be reviewed and merged.

## Useful Links

- [GitHub Forking Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [GitHub Pull Requests Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub Issues Guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
