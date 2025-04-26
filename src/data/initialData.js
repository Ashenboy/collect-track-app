export const initialItems = [
    {
      id: 1,
      title: "Dune",
      category: "Books",
      creator: "Frank Herbert",
      condition: "Good",
      purchaseDate: "2023-01-15",
      purchasePrice: "12.99",
      location: "Living Room Bookshelf",
      isLoaned: true
    },
    {
      id: 2,
      title: "The Legend of Zelda: Breath of the Wild",
      category: "Video Games",
      creator: "Nintendo",
      condition: "Excellent",
      purchaseDate: "2022-06-20",
      purchasePrice: "59.99",
      location: "Game Drawer",
      isLoaned: false
    },
    {
      id: 3,
      title: "Rumours",
      category: "Vinyl Records",
      creator: "Fleetwood Mac",
      condition: "Mint",
      purchaseDate: "2023-03-10",
      purchasePrice: "24.99",
      location: "Record Shelf",
      isLoaned: false
    },
    {
      id: 4,
      title: "Neuromancer",
      category: "Books",
      creator: "William Gibson",
      condition: "Fair",
      purchaseDate: "2021-11-05",
      purchasePrice: "8.99",
      location: "Bedroom Bookshelf",
      isLoaned: false
    },
    {
      id: 5,
      title: "Elden Ring",
      category: "Video Games",
      creator: "FromSoftware",
      condition: "Excellent",
      purchaseDate: "2022-03-15",
      purchasePrice: "69.99",
      location: "Game Drawer",
      isLoaned: false
    },
    {
      id: 6,
      title: "Abbey Road",
      category: "Vinyl Records",
      creator: "The Beatles",
      condition: "Good",
      purchaseDate: "2022-09-22",
      purchasePrice: "29.99",
      location: "Record Shelf",
    isLoaned: false
  },
  {
    id: 7,
    title: "Project Hail Mary",
    category: "Books",
    creator: "Andy Weir",
    condition: "Excellent",
    purchaseDate: "2023-05-18",
    purchasePrice: "14.99",
    location: "Living Room Bookshelf",
    isLoaned: false
  },
  {
    id: 8,
    title: "Dark Side of the Moon",
    category: "Vinyl Records",
    creator: "Pink Floyd",
    condition: "Mint",
    purchaseDate: "2022-12-01",
    purchasePrice: "34.99",
    location: "Record Shelf",
    isLoaned: true
  }
];

export const initialLoans = [
  {
    id: 1,
    itemId: 1,
    borrowerName: "Alex Johnson",
    borrowerContact: "alex@example.com",
    loanDate: "2023-06-15T00:00:00.000Z",
    dueDate: "2023-07-15T00:00:00.000Z",
    status: "active",
    notes: "Said they'll return it after their vacation"
  },
  {
    id: 2,
    itemId: 8,
    borrowerName: "Jordan Smith",
    borrowerContact: "555-123-4567",
    loanDate: "2023-05-20T00:00:00.000Z",
    dueDate: "2023-06-20T00:00:00.000Z",
    status: "active",
    notes: ""
  }
];