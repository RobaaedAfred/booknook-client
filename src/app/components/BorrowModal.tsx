"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authFetch } from "../../lib/api";
import { errorMessage } from "../../lib/utils";
import type { AppUser, Book, Borrow } from "@/app/types";

const DAY = 24 * 60 * 60 * 1000;
const toInput = (d: number | Date) => new Date(d).toISOString().slice(0, 10);

interface BorrowModalProps {
  book: Book;
  user: AppUser;
  onClose: () => void;
  onBorrowed: () => void;
}

export default function BorrowModal({ book, user, onClose, onBorrowed }: BorrowModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [{ returnDate: initialReturnDate, minDate, maxDate }] = useState(() => {
    const now = Date.now();
    return {
      minDate: toInput(now + DAY),
      maxDate: toInput(now + 60 * DAY),
      returnDate: toInput(now + 14 * DAY),
    };
  });
  const [returnDate, setReturnDate] = useState(initialReturnDate);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authFetch<Borrow>("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id, returnDate }),
      });
      onBorrowed();
    } catch (err) {
      toast.error(errorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box rounded-3xl">
        <h3 className="font-display text-2xl font-bold">Borrow “{book.title}”</h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Name</span>
            <input value={user.name || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input value={user.email || ""} readOnly className="input input-bordered w-full bg-base-200" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Return date</span>
            <input
              type="date"
              required
              value={returnDate}
              min={minDate}
              max={maxDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-full">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn btn-primary rounded-full px-8">
              {submitting ? <span className="loading loading-spinner loading-sm" /> : "Confirm Borrow"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose} />
    </div>
  );
}
