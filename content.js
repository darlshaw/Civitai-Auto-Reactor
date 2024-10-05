function autoReact(postCount, timeout) {
  let reactedCount = 0;

  function reactToNextPost() {
    if (reactedCount >= postCount) {
      console.log('Auto-react complete');
      return;
    }

    const posts = document.querySelectorAll('.mantine-n1z9jx');
    let reacted = false;

    for (const post of posts) {
      const buttons = post.querySelectorAll('button.mantine-UnstyledButton-root.mantine-Button-root');
      
      if (buttons.length > 0) {
        let targetButton = buttons[0]; // First child button
        
        if (targetButton.classList.contains('mantine-fjh1u7') && buttons.length > 1) {
          targetButton = buttons[1]; // Second child button
        }
        
        if (targetButton.classList.contains('mantine-4ijnyf')) {
          targetButton.click();
          targetButton.classList.remove('mantine-4ijnyf');
          targetButton.classList.add('mantine-1rk94m8');
          reactedCount++;
          console.log(`Reacted to post ${reactedCount}`);
          reacted = true;
          break;  // Only react to one post per cycle
        }
      }
    }

    if (!reacted) {
      // If no reactions were made, scroll down to load more content
      window.scrollTo(0, document.body.scrollHeight);
      console.log('Scrolling to load more content');
    }

    // Schedule the next reaction
    setTimeout(reactToNextPost, timeout);
  }

  reactToNextPost();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "autoReact") {
    autoReact(request.postCount, request.timeout);
  }
});