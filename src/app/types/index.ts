export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"] as const;
export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: string | null | undefined): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}


export interface Book {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: { name: string; email: string };
  createdAt: string;
  updatedAt?: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt?: Date | string;
}

export interface AppSession {
  data: { user: AppUser } | null;
  isPending: boolean;
}
