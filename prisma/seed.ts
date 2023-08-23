import { Author, Prisma } from "@prisma/client";
import { db } from "../src/utils/db.server";

const authors: Prisma.AuthorCreateInput[] = [
  { firstName: "J.K.", lastName: "Rowling" },
  { firstName: "Stephen", lastName: "King" },
  { firstName: "J.R.R.", lastName: "Tolkien" },
  { firstName: "George R.R.", lastName: "Martin" },
  { firstName: "C.S.", lastName: "Lewis" },
  { firstName: "Neil", lastName: "Gaiman" },
];

const books: Omit<Prisma.BookCreateInput, 'author'>[] = [
  { title: "Harry Potter and the Philosopher's Stone", isFiction: true, datePublished: new Date("1997-06-26") },
  { title: "Harry Potter and the Chamber of Secrets", isFiction: true, datePublished: new Date("1998-07-02") },
  { title: "Harry Potter and the Prisoner of Azkaban", isFiction: true, datePublished: new Date("1999-07-08") },
  { title: "Harry Potter and the Goblet of Fire", isFiction: true, datePublished: new Date("2000-07-08") },
  { title: "Harry Potter and the Order of the Phoenix", isFiction: true, datePublished: new Date("2003-06-21") },
];

async function seed() {
  await Promise.all(
    authors.map(async (author) => {
      await db.author.create({ data: author });
    })
  );

  const author: Author = (await db.author.findFirst({ where: { firstName: "J.K.", lastName: 'Rowling' } })) as Author;

  await Promise.all(
    books.map(async (book) => {
      await db.book.create({ data: {
        ...book,
        authorId: (author).id
      } });
    }
  ));
}

seed()