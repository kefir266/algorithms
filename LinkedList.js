class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    if (this.tail === null) {
      this.head = new Node(value);
      this.tail = this.head;
      this.length = 1;
      return;
    }
    this.tail.next = new Node(value);
    this.tail = this.tail.next;
    ++this.length;
  }

  pop() {
    if (this.head === null) {
      return null;
    }
    let pointer = this.head;
    let newTail = pointer.next;
    while (pointer.next !== null) {
      newTail = pointer;
      pointer = pointer.next;
    }

    --this.length;
    if (!newTail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return pointer;
    }
    this.tail = newTail;
    this.tail.next = null;

    return pointer;
  }

  shift() {
    if (this.head === null) {
      return null;
    }
    const node = this.head;
    this.head = this.head.next;
    --this.length;
    if (this.head === null) {
      this.tail = null;
    }

    return node;
  }

  unshift(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    ++this.length;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  insert(index, value) {
    if (index > this.length || index < 0) {
      return false;
    }
    const newNode = new Node(value);
    let node = this.head;
    this.length++;

    if (index === 0) {
      newNode.next = node;
      this.head = newNode;
      return true;
    }
    if (index === this.length - 1) {
      this.tail.next = newNode;
      this.tail = newNode;
      return true;
    }
    for (let i = 0; i < index - 1; i++) {
      node = node.next;
    }
    newNode.next = node.next;
    node.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    return true;
  }

  remove(index) {
    if (this.length === 0 || index >= this.length || index < 0) {
      return null;
    }
    --this.length;
    let node = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      node.next = null;
      return node;
    }
    if (index === 0) {
      const deletedNode = node;
      this.head = node.next;
      deletedNode.next = null;

      return deletedNode;
    }
    for (let i = 0; i < index - 1; i++) {
      node = node.next;
    }
    const deletedNode = node.next;
    node.next = node.next.next;
    if (node.next === null) {
      this.tail = node;
    }
    deletedNode.next = null;
    return deletedNode;
  }

  get(index) {
    if (this.length === 0 || index >= this.length || index < 0) {
      return;
    }
    let node = this.head;

    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node;
  }

  set(index, value) {
    if (this.length === 0 || index >= this.length || index < 0) {
      return false;
    }

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    node.value = value;
    return true;
  }

  ///////// Utility methods //////////

  printList() {
    let temp = this.head;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  getHead() {
    if (this.head === null) {
      console.log("Head: null");
    } else {
      console.log("Head: " + this.head.value);
    }
  }

  getTail() {
    if (this.head === null) {
      console.log("Tail: null");
    } else {
      console.log("Tail: " + this.tail.value);
    }
  }

  getLength() {
    console.log("Length: " + this.length);
  }

  makeEmpty() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
