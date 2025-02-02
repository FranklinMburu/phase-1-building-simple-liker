// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select all "like" elements in the DOM
const likeButtons = document.querySelectorAll('.like');

// Select the modal and modal message element
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

// Add the hidden class to the modal initially
modal.classList.add('hidden');

// Add event listener to each like button
likeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const likeGlyph = event.target.querySelector('.like-glyph');
    
    // Call the mimicServerCall function to simulate a server request
    mimicServerCall().then(() => {
      // On success, change the heart to a full heart and add the activated-heart class
      if (likeGlyph.textContent === EMPTY_HEART) {
        likeGlyph.textContent = FULL_HEART;
        likeGlyph.classList.add('activated-heart');
      } else {
        // If it's already a full heart, change it back to an empty heart and remove the activated-heart class
        likeGlyph.textContent = EMPTY_HEART;
        likeGlyph.classList.remove('activated-heart');
      }
    }).catch((error) => {
      // On failure, show the error modal with the error message
      modalMessage.textContent = error;
      modal.classList.remove('hidden');
      
      // Hide the modal after 3 seconds
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 3000);
    });
  });
});

// Don't change the code below: this function mocks the server response
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2; // 20% chance of failure
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
