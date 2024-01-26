
$(document).ready(function () {


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

async function linkClientsToContact(contactId, selectedClients) {
  try {
    // Send an AJAX request to link clients to the contact
    const response = await $.ajax({
      url: `/contacts/link/${contactId}`,
      method: 'POST',
      data: { clients: selectedClients },
    });

    // Check the response and handle it accordingly
    if (response.success) {
      console.log('Clients linked successfully:', selectedClients);
      // Remove the linked contact from the unlinked section
      $(`#availableContacts li[data-contact-id="${contactId}"]`).remove();
    } else {
      console.error('Error linking clients:', response.error);
      // Optionally, you can show an error message to the user
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Add an event listener for the Link button click
$('#linkButton').on('click', function () {
  // Retrieve selected clients from the dropdown
  const selectedClients = $('#clientList').val();

  // Get the contact ID from the modal data attribute
  const contactId = $('#linkModal').data('contact-id');

  // Call the function to link clients to the contact
  linkClientsToContact(contactId, selectedClients);

  // Close the modal
  closeModal();
});

// Add an event listener for the modal close button
$('.close').on('click', function () {
  // Get the linked client IDs from the selected options in the dropdown
  const linkedClientIds = $('#clientDropdown').val();

  // Iterate through the linked clients and remove them from the dropdown
  linkedClientIds.forEach((clientId) => {
    // Remove from the modal dropdown
    $(`#clientDropdown option[value="${clientId}"]`).remove();
  });

  // Close the modal
  closeModal();
});
// Open the unlink modal when Unlink is clicked
$('.unlink').on('click', function (event) {
  event.preventDefault();
  const clientId = $(this).data('client-id');
  openUnlinkModal(clientId);
});

// Fetch and populate contacts dropdown when the unlink modal is opened
function openUnlinkModal(clientId) {
  fetchAndPopulateContactsDropdown();

  // Set the clientId as a data attribute in the modal
  $('#unlinkModal').data('client-id', clientId);

  // Show the unlink modal
  $('#unlinkModal').show();
}

// Function to fetch available contacts from the server and populate the dropdown
function fetchAndPopulateContactsDropdown() {
  // Fetch available contacts from the server
  $.ajax({
    url: '/clients/availableContacts',
    method: 'GET',
    success: function (availableContacts) {
      populateContactDropdown(availableContacts);
    },
    error: function (error) {
      console.error('Error fetching available contacts:', error);
    },
  });
}

// Function to populate the contact dropdown
function populateContactDropdown(options) {
  const dropdown = $('#contactDropdown');
  dropdown.empty();
  options.forEach(option => {
    dropdown.append($('<option></option>').text(`${option.name} (${option.email})`).val(option._id));
  });
}

// Open the unlink modal when Unlink is clicked
$('.unlink').on('click', function (event) {
  event.preventDefault();
  const clientId = $(this).data('client-id');
  openUnlinkModal(clientId);
});

// Add an event listener for the Unlink modal close button
$('#unlinkModal .close-modal').on('click', function () {
  // Close the unlink modal
  closeUnlinkModal();
});

// Add an event listener for the Unlink button click
$('#unlinkButton').on('click', function () {
  // Retrieve selected contacts from the dropdown
  const selectedContacts = $('#contactDropdown').val();

  // Get the client ID from the modal data attribute
  const clientId = $('#unlinkModal').data('client-id');

  // Call the function to unlink contacts from the client
  unlinkContactsFromClient(clientId, selectedContacts);

  // Close the unlink modal
  closeUnlinkModal();
});

function closeUnlinkModal() {
  // Clear the dropdown and hide the unlink modal
  $('#contactDropdown').empty();
  $('#unlinkModal').hide();
}

});
