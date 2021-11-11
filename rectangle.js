window.rectanglesData = [
  { id: 0, x: 100, y: 100, width: 200, height: 150, radius: 10 },
  { id: 1, x: 400, y: 150, width: 300, height: 100, radius: 30 },
  { id: 2, x: 150, y: 400, width: 250, height: 150, radius: 20 },
];

class Rectangle {
  #Id;
  #x;
  #y;
  #width;
  #height;
  #radius;

  // provide the object according to id and also check if the given id is found or not
  getRectById(id) {
    let check = false;
    rectanglesData.map((item) => {
      if (item.id == id) {
        check = true;
        this.#x = item.x;
        this.#y = item.y;
        this.#width = item.width;
        this.#height = item.height;
        this.#radius = item.radius;
      }
    });
    if (check) {
      this.#Id = id;
      return this;
    } else {
      throw "no id found";
    }
  }

  //set Rectangle position
  setPosition(x, y) {
    if (this.#id == null) {
      throw "no rectangle intit";
    }
    let rectangle = document.getElementById(`${this.#Id}`);
    rectangle.style.top = x;
    rectangle.style.left = y;
    this.#x = x;
    this.#y = y;
  }

  //set Rectangle height and width
  setSize(height, width) {
    if (this.#id == null) {
      throw "no rectangle intit";
    }
    let rectangle = document.getElementById(`${this.#Id}`);
    rectangle.style.height = height;
    rectangle.style.width = width;
    this.#height = height;
    this.#width = width;
  }

  //set Rectangle cornor radius
  setCornerRadius(radius) {
    if (this.#id == null) {
      throw "no rectangle intit";
    }
    let rectangle = document.getElementById(`${this.#Id}`);
    rectangle.style.borderRadius = `${radius}px`;
    this.#radius = radius;
  }
  //set Rectangle json Data
  toJSON() {
    if (this.#id == null) {
      throw "no rectangle intit";
    }
    let json = {
      id: this.#Id,
      width: this.#width,
      height: this.#height,
      x: this.#x,
      y: this.#y,
      radius: this.#radius,
    };
    return json;
  }

  // genrate the rectangle
  generateRectangle(data) {
    let rectangle = document.createElement("div");
    rectangle.id = data.id;
    rectangle.style.height = data.height;
    rectangle.style.width = data.width;
    rectangle.style.borderRadius = `${data.radius}px`;
    rectangle.style.position = "absolute";
    rectangle.style.top = data.x;
    rectangle.style.left = data.y;
    rectangle.classList.add("rectangle");
    return rectangle;
  }

  //generate rectangles handle
  generateHandle(data) {
    let handle = document.createElement("div");
    handle.id = `${data.id}-handle`;
    handle.style.height = 10;
    handle.style.width = 10;
    handle.style.borderRadius = `50%`;
    handle.style.position = "absolute";
    handle.style.top = 0;
    handle.style.right = 10;

    handle.classList.add("handle");
    return handle;
  }

  //   handle radius change by draging rectangle
  MakeHandleDrageAble() {
    rectanglesData.forEach((data) => {
      let handle = document.getElementById(`${data.id}-handle`);
      handle.addEventListener("mousedown", (event) => {
        handle.addEventListener("mousemove", (e) => {
          let rect = document.getElementById(`${data.id}`);
          rect.style.borderRadius = `${
            Math.abs(rect.offsetTop - rect.offsetLeft) / 8
          }px`;
        });
      });
    });
  }

  //   Make rectangles drage able
  MakeRectanglesDrageAble() {
    rectanglesData.forEach((data) => {
      let rectangle = document.getElementById(`${data.id}`);
      this.dragElement(rectangle);
    });
  }

  //drage element
  dragElement(rectangle) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      //get mous position at start
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDraging;
      //call drag function whenever mous moves
      document.onmousemove = dragElement;
    };

    const dragElement = (e) => {
      e = e || window.event;
      e.preventDefault();
      //calculate new cursore position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      //set the element new position
      rectangle.style.top = rectangle.offsetTop - pos2 + "px";
      rectangle.style.left = rectangle.offsetLeft - pos1 + "px";
    };

    // close the dragging
    const closeDraging = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
    // start of dragging init
    rectangle.onmousedown = dragMouseDown;
  }
}

// Generate Rectangles
function Generate_rectangles() {
  let rect = new Rectangle();
  rectanglesData.forEach((data) => {
    let rectangle = rect.generateRectangle(data);
    let handle = rect.generateHandle(data);
    rectangle.appendChild(handle);
    document.getElementById("main_container").appendChild(rectangle);
  });
  rect.MakeRectanglesDrageAble();
  rect.MakeHandleDrageAble();
}

Generate_rectangles();
