
window.onload = function() {
    axios.get(`/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // Display the data on the frontend as needed
      })
      .catch(error => {
        console.error(error);
      });
  };

// Save the token to local storage
function saveTokenToLocalStorage(token) {
  localStorage.setItem('token', token);
  console.log('workint till here')
}

saveTokenToLocalStorage(token);
