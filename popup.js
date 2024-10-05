document.addEventListener('DOMContentLoaded', function() {
  const autoReactButton = document.getElementById('autoReact');
  const postCountInput = document.getElementById('postCount');
  const timeoutInput = document.getElementById('timeout');
  const statusDiv = document.getElementById('status');

  autoReactButton.addEventListener('click', function() {
      const postCount = parseInt(postCountInput.value);
      const timeout = parseInt(timeoutInput.value);

      if (isNaN(postCount) || isNaN(timeout) || postCount < 1 || timeout < 1000) {
          statusDiv.textContent = 'Please enter valid numbers.';
          return;
      }

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              action: "autoReact",
              postCount: postCount,
              timeout: timeout
          }, function(response) {
              if (chrome.runtime.lastError) {
                  statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
              } else {
                  statusDiv.textContent = 'Auto-reacting started!';
                  autoReactButton.disabled = true;
                  autoReactButton.textContent = 'Running...';
              }
          });
      });
  });
});