const searchForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`)
    .then(
      (response) => {
        response.json().then(
          (data) => {
            if (data.error) {
              messageOne.textContent = data.error;
              return;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
    .catch((error) => console.log(error));
});
