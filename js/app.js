const loadData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayCourse = async () => {
  spinnerShow(true);
  const coursesRawData = await loadData(
    "https://openapi.programming-hero.com/api/course/curriculum"
  );
  const courses = coursesRawData.data;
  console.log(courses);

  const courseContainer = document.getElementById("course-container");
  clearAll();

  courses.forEach((course) => {
    const { image, name, modules } = course;

    const courseDiv = document.createElement("div");
    courseDiv.classList.add(
      "card",
      "card-compact",
      "w-full",
      "bg-base-100",
      "shadow-lg"
    );
    courseDiv.innerHTML = `
        <figure><img src="${image}" alt="Shoes" /></figure>
        `;

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const tabDiv = document.createElement("div");
    tabDiv.setAttribute("tabindex", 0);
    tabDiv.classList.add(
      "collapse",
      "collapse-arrow",
      "border",
      "border-base-300",
      "bg-base-100",
      "rounded-box",
      "shadow-md"
    );

    const courseCurriculam = document.createElement("div");
    courseCurriculam.classList.add(
      "collapse-title",
      "text-xl",
      "font-medium",
      "text-purple-600"
    );
    courseCurriculam.innerHTML = `
    ${name}
`;

    const courseDetails = document.createElement("div");
    courseDetails.classList.add("collapse-content", "text-lg");

    const ul = document.createElement("ul");
    ul.classList.add("list-decimal", "list-inside");

    modules.forEach((module) => {
      const li = document.createElement("li");
      li.innerText = module.name;
      ul.appendChild(li);
    });

    courseDetails.appendChild(ul);

    tabDiv.appendChild(courseCurriculam);
    tabDiv.appendChild(courseDetails);

    divBody.appendChild(tabDiv);

    courseDiv.appendChild(divBody);

    courseContainer.appendChild(courseDiv);
  });
  spinnerShow(false);
};

const searchDisplayCourse = async (searchText) => {
  const coursesRawData = await loadData(
    "https://openapi.programming-hero.com/api/course/curriculum"
  );
  const courses = coursesRawData.data;
  //   console.log(courses);

  const courseContainer = document.getElementById("course-container");
  clearAll();

  courses.forEach((course) => {
    const { image, name, modules } = course;

    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      if (
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        module.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        console.log(
          name.toLowerCase(),
          module.name.toLowerCase(),
          searchText.toLowerCase()
        );

        const courseDiv = document.createElement("div");
        courseDiv.classList.add(
          "card",
          "card-compact",
          "w-full",
          "bg-base-100",
          "shadow-lg"
        );
        courseDiv.innerHTML = `
              <figure><img src="${image}" alt="Shoes" /></figure>
              `;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const tabDiv = document.createElement("div");
        tabDiv.setAttribute("tabindex", 0);
        tabDiv.classList.add(
          "collapse",
          "collapse-arrow",
          "border",
          "border-base-300",
          "bg-base-100",
          "rounded-box",
          "shadow-md"
        );

        const courseCurriculam = document.createElement("div");
        courseCurriculam.classList.add(
          "collapse-title",
          "text-xl",
          "font-medium",
          "text-purple-600"
        );
        courseCurriculam.innerHTML = `
          ${name}
      `;

        const courseDetails = document.createElement("div");
        courseDetails.classList.add("collapse-content", "text-lg");

        const ul = document.createElement("ul");
        ul.classList.add("list-decimal", "list-inside");

        modules.forEach((module) => {
          const li = document.createElement("li");
          li.innerText = module.name;
          ul.appendChild(li);
        });

        courseDetails.appendChild(ul);

        tabDiv.appendChild(courseCurriculam);
        tabDiv.appendChild(courseDetails);

        divBody.appendChild(tabDiv);

        courseDiv.appendChild(divBody);

        courseContainer.appendChild(courseDiv);

        break;
      }
    }
  });
  spinnerShow(false);
  if (courseContainer.textContent === "") {
    noResult(true);
  }
};

const clearAll = () => {
  const courseContainer = document.getElementById("course-container");
  courseContainer.textContent = "";
  spinnerShow(false);
  noResult(false);
};

const noResult = (isNoResult) => {
  const noResultElement = document.getElementById("no-result-found");
  if (isNoResult === true) {
    noResultElement.classList.remove("hidden");
  } else {
    noResultElement.classList.add("hidden");
  }
};

const spinnerShow = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading === true) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      spinnerShow(true);
      noResult(false);
      searchDisplayCourse(event.target.value);
    }
  });

document.getElementById("btn-search").addEventListener("click", () => {
  const searchText = document.getElementById("search-input").value;
  spinnerShow(true);
  noResult(false);
  searchDisplayCourse(searchText);
});



displayCourse();