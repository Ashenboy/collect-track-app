export const initialItems = [
  {
    id: 1,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    category: "Books",
    creator: "J.R.R. Tolkien",
    condition: "Good",
    purchaseDate: "2023-08-15",
    purchasePrice: "14.99",
    location: "Living Room Bookshelf",
    isLoaned: true
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    category: "Books",
    creator: "J.K. Rowling",
    condition: "Excellent",
    purchaseDate: "2023-09-03",
    purchasePrice: "12.50",
    location: "Study Bookcase",
    isLoaned: false
  },
  {
    id: 3,
    title: "The Legend of Zelda: Breath of the Wild",
    category: "Video Games",
    creator: "Nintendo",
    condition: "Mint",
    purchaseDate: "2023-07-22",
    purchasePrice: "59.99",
    location: "Game Cabinet",
    isLoaned: false
  },
  {
    id: 4,
    title: "Abbey Road",
    category: "Vinyl Records",
    creator: "The Beatles",
    condition: "Good",
    purchaseDate: "2023-10-05",
    purchasePrice: "27.99",
    location: "Record Shelf",
    isLoaned: false
  },
  {
    id: 5,
    title: "The Hobbit",
    category: "Books",
    creator: "J.R.R. Tolkien",
    condition: "Fair",
    purchaseDate: "2023-06-18",
    purchasePrice: "9.99",
    location: "Bedroom Bookshelf",
    isLoaned: false
  },
  {
    id: 6,
    title: "Dark Side of the Moon",
    category: "Vinyl Records",
    creator: "Pink Floyd",
    condition: "Excellent",
    purchaseDate: "2023-09-30",
    purchasePrice: "32.50",
    location: "Record Shelf",
    isLoaned: false
  },
  {
    id: 7,
    title: "Elden Ring",
    category: "Video Games",
    creator: "FromSoftware",
    condition: "Excellent",
    purchaseDate: "2023-08-12",
    purchasePrice: "69.99",
    location: "Game Cabinet",
    isLoaned: true
  },
  {
    id: 8,
    title: "1984",
    category: "Books",
    creator: "George Orwell",
    condition: "Good",
    purchaseDate: "2023-07-05",
    purchasePrice: "10.99",
    location: "Study Bookcase",
    isLoaned: false
  },
  {
    id: 9,
    title: "Thriller",
    category: "Vinyl Records",
    creator: "Michael Jackson",
    condition: "Good",
    purchaseDate: "2023-10-01",
    purchasePrice: "24.99",
    location: "Record Shelf",
    isLoaned: false
  },
  {
    id: 10,
    title: "The Last of Us Part II",
    category: "Video Games",
    creator: "Naughty Dog",
    condition: "Mint",
    purchaseDate: "2023-09-15",
    purchasePrice: "49.99",
    location: "Game Cabinet",
    isLoaned: false
  },
  {
    id: 11,
    title: "To Kill a Mockingbird",
    category: "Books",
    creator: "Harper Lee",
    condition: "Good",
    purchaseDate: "2023-08-25",
    purchasePrice: "11.99",
    location: "Living Room Bookshelf",
    isLoaned: false
  },
  {
    id: 12,
    title: "Nevermind",
    category: "Vinyl Records",
    creator: "Nirvana",
    condition: "Excellent",
    purchaseDate: "2023-09-20",
    purchasePrice: "29.99",
    location: "Record Shelf",
    isLoaned: false
  }
];

export const initialLoans = [
  {
    id: 1,
    itemId: 1,
    borrowerName: "Sarah Johnson",
    borrowerContact: "sarah.j@email.com",
    loanDate: "2023-11-05",
    dueDate: "2023-12-05",
    status: "active",
    notes: "Promised to return before Christmas"
  },
  {
    id: 2,
    itemId: 7,
    borrowerName: "Michael Chen",
    borrowerContact: "555-123-4567",
    loanDate: "2023-10-20",
    dueDate: "2023-11-20",
    status: "overdue",
    notes: "Extended loan period by 1 week"
  },
  {
    id: 3,
    itemId: 4,
    borrowerName: "Alex Rodriguez",
    borrowerContact: "alex@example.com",
    loanDate: "2023-09-15",
    dueDate: "2023-10-15",
    status: "returned",
    returnDate: "2023-10-12",
    notes: "Returned early"
  }
];