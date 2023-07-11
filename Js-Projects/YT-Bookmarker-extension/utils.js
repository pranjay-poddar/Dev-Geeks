//this helps us to find the active tab that the user is on and whether the user has already created a bookmark on this page.

export async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  return tabs[0];
}
