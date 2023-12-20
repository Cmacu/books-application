# Books application

We want to create a new book tracking application and we need your help! Make a system that allows for CRUD on at least two entities. For example, an author, and a book entity.

```JavaScript
// Book
{
  id: number,
  title: string,
  author: Author,
  pageCount: number,
  createdAt: Date,
  updatedAt: Date,
  releaseDate: Date
}
// Author
{
  firstName: string,
  lastName: string,
  createdAt: Date,
  updatedAt: Date,
  books: Book[]
}
```

## Requirements:

Do not take more than 4 hours to complete this assignment. Budget your time and if you use all 4 hours, please stop and provide what code you were able to write.

- Use git to track all changes, does not require you to submit to a remote repository.
- Create, Update, Delete, Index, Individual Get endpoints for all implemented entities.
- All endpoints must follow REST standards with naming and organization.
- All responses must be paginated.
- Must be built with Node.js and MySQL.
  - Express, Nest, or your preferred Node.js Server.
  - You can use any other tools necessary to build your application.
    - i.e. TypeOrm, Knex, Prisma, ObjectionJS for your DB queries.
- No authentication is required.
- Add at least 3 unit tests to cover your code, no coverage requirements necessary here, but it should show us how you prefer to implement testing.
- Detailed steps in a README.md for how to run your solution. We must be able to run your application to be able to consider your take home test.
- Please submit your challenge to the recruiter in your preferred method.
  - i.e. a github link, a zip file of your project, etc.
