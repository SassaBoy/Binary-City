
document.addEventListener("DOMContentLoaded", function () {
  // ... (your existing tab switching script)

// AJAX linking logic
$('.link').on('click', function (event) {
  event.preventDefault();
  const clientId = $(this).data('client-id');
  const contactId = $(this).data('contact-id');

  $.ajax({
    url: `/clients/new/link/${clientId}/${contactId}`,
    method: 'GET',
    success: function (data) {
      console.log(data); // Log the response, you can handle it as needed
      // Reload the page or update the UI as necessary
      location.reload();
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});

// AJAX form validation logic
$('#general form').on('submit', function (event) {
event.preventDefault();

// Get form data
const formData = {
name: $('#name').val(),
surname: $('#surname').val(),
email: $('#email').val(),
};

// Send AJAX request to the backend for validation
$.ajax({
url: '/contacts/new',
method: 'POST',
data: formData,
success: function (data) {
$('#errorMessages').text(data.error || data.success).css('color', data.error ? 'red' : 'green').show();
if (!data.error) {
  // Redirect to contact view on success
  window.location.href = '/contacts';
}
},

error: function (xhr) {
// Handle error response
const responseData = JSON.parse(xhr.responseText);
$('#errorMessages').text(responseData.error).show();
}
});

});
});


function openTab(tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  // ... (your existing tab switching script)

  // AJAX unlinking logic
  $('.unlink').on('click', function (event) {
    event.preventDefault();
    const clientId = $(this).data('client-id');
    const contactId = $(this).data('contact-id');

    $.ajax({
      url: `/clients/${clientId}/unlink/${contactId}`,
      method: 'GET',
      success: function (data) {
        console.log(data); // Log the response, you can handle it as needed
        // Reload the page or update the UI as necessary
        location.reload();
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  });
});

// AJAX client code generation logic
$('#clientForm').on('submit', function (event) {
  event.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    method: $(this).attr('method'),
    data: $(this).serialize(),
    success: function (data) {
      console.log(data); // Log the response, you can handle it as needed
      // Update the UI with the generated client code
      $('#clientCode').val(data.clientCode);
      $('#clientCodeContainer').show();
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});

function openTab(tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

// Add this to your existing JavaScript or create a new file (e.g., script.js)

$(document).ready(function () {
  // Open the modal when Link is clicked
  $('.link').on('click', function (event) {
    event.preventDefault();
    const contactId = $(this).data('contact-id');
    openModal(contactId);
  });

  // Close the modal when the close button is clicked
  $('.close').on('click', function () {
    closeModal();
  });

  // Handle the Link button click
  $('#linkButton').on('click', async function () {
    try {
      // Retrieve selected clients from the dropdown
      const selectedClients = $('#clientDropdown').val();

      // Get the contact ID from the modal data attribute
      const contactId = $('#linkModal').data('contact-id');

      // Send an AJAX request to the server to link clients to the contact
      const response = await $.ajax({
        url: `/contacts/link/${contactId}`, // Update the endpoint based on your server route
        method: 'POST',
        data: { clients: selectedClients },
      });

      // Check the response and handle it accordingly
      if (response.success) {
        console.log('Clients linked successfully:', selectedClients);
        // Optionally, you can update the UI here based on the server response
      } else {
        console.error('Error linking clients:', response.error);
        // Optionally, you can show an error message to the user
      }

      // Close the modal
      closeModal();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});

  function openModal(contactId) {
    // Add logic to fetch available clients from the server
    $.ajax({
      url: `/contacts/availableClients`,
      method: 'GET',
      success: function (availableClients) {
        populateDropdown(availableClients);
      },
      error: function (error) {
        console.error('Error fetching available clients:', error);
      },
    });

    // Set the contactId as a data attribute in the modal
    $('#linkModal').data('contact-id', contactId);

    // Show the modal
    $('#linkModal').show();
  }

function closeModal() {
  // Clear the dropdown and hide the modal
  $('#clientDropdown').empty();
  $('#linkModal').hide();
}

function populateDropdown(options) {
  const dropdown = $('#clientDropdown');
  dropdown.empty();
  options.forEach(option => {
    dropdown.append($('<option></option>').text(option.name).val(option._id));
  });
}


// AJAX linking logic
$('.link').on('click', function (event) {
  event.preventDefault();
  const contactId = $(this).data('contact-id');
  openModal(contactId);
});

// AJAX unlinking logic
$('.unlink').on('click', function (event) {
  event.preventDefault();
  const clientId = $(this).data('client-id');
  const contactId = $(this).data('contact-id');

  $.ajax({
    url: `/clients/${clientId}/unlink/${contactId}`,
    method: 'GET',
    success: function (data) {
      console.log(data); // Log the response, you can handle it as needed
      // Reload the page or update the UI as necessary
      location.reload();
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});


 // Handle the Link button click
 $('#linkButton').on('click', async function () {
  try {
    // Retrieve selected clients from the dropdown
    const selectedClients = $('#clientDropdown').val();

    // Get the contact ID from the modal data attribute
    const contactId = $('#linkModal').data('contact-id');

    // Send an AJAX request to the server to link clients to the contact
    const response = await $.ajax({
      url: `/contacts/link/${contactId}`, // Update the endpoint based on your server route
      method: 'POST',
      data: { clients: selectedClients },
    });

    // Check the response and handle it accordingly
    if (response.success) {
      console.log('Clients linked successfully:', selectedClients);
      // Optionally, you can update the UI here based on the server response
      // Reload the page or update the UI as necessary
      location.reload();
    } else {
      console.error('Error linking clients:', response.error);
      // Optionally, you can show an error message to the user
    }

    // Close the modal
    closeModal();
  } catch (error) {
    console.error('An error occurred:', error);
  }
});