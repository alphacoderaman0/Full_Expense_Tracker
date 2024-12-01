import dbConnect from "@/app/lib/dbconnect";
import Expense from "@/app/models/expense";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {
  try {
    await dbConnect(); 
    const { id } = params;
    const { title, amount } = await request.json();
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount },
      { new: true } 
    );
    if (!updatedExpense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
